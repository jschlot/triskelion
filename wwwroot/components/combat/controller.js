/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'mobDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList', 'diceService', 'actionDispatcher',
        function ($scope, $location, accessControl, userData, partyDB, mobDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList, diceService, actionDispatcher) {

            'use strict';

            var check = accessControl.check('combat')();
            if (!check) {
                $location.path('/gamegrid');
                return;
            }

            var tileOffset = userData.cursor.tile - 32,
                tileAction = userData.gameModuleSelected.tileActions[tileOffset],
                turnsList = [],
                currentTurn = -1,
                mobInitiative = 0,
                playerInitiative = 0;

            mobDB.add(tileAction.mobMembers);
            mobInitiative = diceService.roll(1,20);
            playerInitiative = diceService.roll(1,20);

            $scope.tells = tellsList;
            $scope.tells = [tileAction.description];

            if(mobInitiative > playerInitiative) {
                $scope.tells.push(infoText.initiativeRolled.replace(/TEAM/, 'Mobs'));
                angular.forEach(mobDB.members, function(player) {
                    turnsList.push(player);
                });
                angular.forEach(partyDB.members, function(player) {
                    turnsList.push(player);
                });
            } else {
                $scope.tells.push(infoText.initiativeRolled.replace(/TEAM/, 'Players'));
                angular.forEach(partyDB.members, function(player) {
                    turnsList.push(player);
                });
                angular.forEach(mobDB.members, function(player) {
                    turnsList.push(player);
                });
            }

            var attack = function(player, event) {
                var tells = [];
                if (player.character.stats.health > 0) {
                    var result = player.character.damage(event), message = '';

                    if (result.amount) {
                        message = infoText.auraDamage
                            .replace(/PLAYER/, player.character.identity.name)
                            .replace(/DAMAGE/, result.amount)
                            .replace(/AURA/, event.aura);
                        tells.push(message);
                    } else {
                        tells.push(infoText.auraMissed.replace(/PLAYER/, player.character.identity.name));
                    }

                    if (result.death) {
                        tells.push(infoText.deathNote.replace(/PLAYER/, player.character.identity.name));
                    }
                }
                return tells;
            };

            var heal = function(player, event) {
                var tells = [];
                var result =  player.character.healing(event), message = '';
                if (result.success) {
                    message = infoText.auraHeal
                        .replace(/PLAYER/, player.character.identity.name)
                        .replace(/HEALTH/, result.amount)
                        .replace(/AURA/, event.aura);
                    tells.push(message);
                } else {
                    tells.push(infoText.auraOverheal.replace(/PLAYER/, player.character.identity.name).replace(/OVERHEAL/, result.amount));
                }
                return tells;
            };

            var updateTurns = function() {
                var combatant;

                currentTurn++;

                if (currentTurn === turnsList.length) {
                    currentTurn = 0;
                }

                combatant = turnsList[currentTurn];

                if (partyDB.partyHP() === 0) {
                    alert("Party all dead; Time to go back to camp");
                }

                if (mobDB.partyHP() === 0) {
                    alert("Mobs all dead; Time for the loot screen");
                }

                if (combatant.character.npc) {

                    if (combatant.character.stats.health !== 0) {
                        var randomPlayer = partyDB.members[Math.floor(Math.random()  *partyDB.members.length)];
                        $scope.tells = attack(randomPlayer, combatant.character.abilities[0]);
                     }

                    $scope.availableActions = [
                        combatScreenMenuOptions.next
                    ];

                    $scope.page = {
                        name: infoText.combatscreen,
                        turn: currentTurn,
                        who: combatant.character.identity.name
                    };
                } else {
                    $scope.tells = [infoText.playerTurn.replace(/PLAYER/, combatant.character.identity.name)];

                    $scope.availableActions = [
                        combatScreenMenuOptions.fight,
                        combatScreenMenuOptions.spell,
                        combatScreenMenuOptions.use,
                        combatScreenMenuOptions.run,
                        combatScreenMenuOptions.next
                    ];

                    $scope.page = {
                        name: infoText.combatscreen,
                        turn: currentTurn,
                        who: combatant.character.identity.name
                    };
                }
            };

            $scope.context = null;
            $scope.subcontext = null;
            $scope.abilitySelected = null;

            $scope.saveAndNext = function (value) {
                var actionsList = {
                    fight: function (actionSelected) {
                        $scope.tells = [infoText.chooseEnemy];
                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];
                        $scope.context = 'confirmFight';
                    },
                    spell: function (actionSelected) {
                        var combatant = turnsList[currentTurn];
                        $scope.tells = [infoText.chooseSpell];

                        $scope.availableActions = [];
                        angular.forEach(combatant.character.abilities, function(ability) {
                            $scope.availableActions.push(ability);
                        });

                        $scope.context = 'confirmPartyTarget';
                    },
                    use: function (actionSelected) {
                        $scope.tells = [infoText.chooseItem];
                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];
                        $scope.context = 'confirmUse';
                    },
                    run: function (actionSelected) {
                        $scope.tells = [infoText.playerRuns];
                        updateTurns();
                    },
                    next: function (actionSelected) {
                        updateTurns();
                    },
                    confirmFight: function (index) {
                        var lookup = $scope.mobData[index - 1];
                        if (lookup) {
                            $scope.tells = attack(lookup, {
                                name: 'Melee',
                                hotkey: 'M',
                                _self: 'melee',
                                actionType: 'damage',
                                description: '',
                                aura: 'blunt',
                                save: 'agility',
                                level: 1,
                                check: 10,
                                modifier: 1,
                                success: {
                                    numberOfDice: 1,
                                    diceSides: 4
                                },
                                failure: null
                            });

                            $scope.availableActions = [
                                combatScreenMenuOptions.next
                            ];

                            $scope.context = null;
                        }
                    },
                    confirmPartyTarget: function (actionSelected) {
                        $scope.tells = [infoText.chooseTargetGroup];

                        $scope.availableActions = [
                            combatScreenMenuOptions.party,
                            combatScreenMenuOptions.mobs
                        ];

                        $scope.context = "confirmSpellTarget";
                        $scope.abilitySelected = actionSelected;
                    },
                    confirmSpellTarget: function (actionSelected) {
                        $scope.tells = [infoText.chooseTargetPlayer];

                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];

                        $scope.context = "confirmSpell";
                    },
                    confirmSpell: function (value) {
                        if ($scope.subcontext === 'mobs') {
                            $scope.tells = attack(mobDB.members[value-1], $scope.abilitySelected);
                        } else {

                            // check to see what the spell type is
                            if ($scope.abilitySelected.actionType === 'damage') {
                                $scope.tells = attack(partyDB.members[value-1], $scope.abilitySelected);
                            } else {
                                $scope.tells = heal(partyDB.members[value-1], $scope.abilitySelected);
                            }
                        }

                        $scope.availableActions = [
                            combatScreenMenuOptions.next
                        ];

                        $scope.context = null;
                    },
                    confirmUse: function (index) {
                        // TO-DO: this is spoofed
                        $scope.tells = [infoText.chosenThing];

                        $scope.availableActions = [
                            combatScreenMenuOptions.next
                        ];

                        $scope.context = null;
                    }
                };

                if (angular.isNumber(value) && $scope.context) {
                    actionsList[$scope.context](value);
                } else if (actionsList[$scope.context]) {
                    $scope.subcontext = value._self;
                    actionsList[$scope.context](value);
                } else {
                    actionDispatcher(actionsList[value._self], value);
                }
            };

            $scope.mobData = mobDB.members;
            $scope.availableActions = [];
            $scope.partyData = partyDB.members;

            updateTurns();
        }
    ]);
