/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service', 'triskelion.character.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'mobDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList', 'diceService', 'actionDispatcher', 'ability',
        function ($scope, $location, accessControl, userData, partyDB, mobDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList, diceService, actionDispatcher, ability) {

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

            mobDB.members.length = 0;
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
                var message;
                if (player.character.stats.health > 0) {
                    var result = player.character.damage(event);

                    if (result.amount) {
                        message = infoText.auraDamage
                            .replace(/PLAYER/, player.character.identity.name)
                            .replace(/DAMAGE/, result.amount)
                            .replace(/AURA/, event.aura);
                    } else {
                        message = infoText.auraMissed.replace(/PLAYER/, player.character.identity.name);
                    }

                    if (result.death) {
                        message += infoText.deathNote;
                    }
                }
                return message;
            };

            var heal = function(player, event) {
                var message;
                var result =  player.character.healing(event);
                if (result.hit) {
                    message = infoText.auraHeal
                        .replace(/PLAYER/, player.character.identity.name)
                        .replace(/HEALTH/, result.amount)
                        .replace(/AURA/, event.aura);
                } else {
                    message = infoText.auraOverheal
                            .replace(/PLAYER/, player.character.identity.name)
                            .replace(/OVERHEAL/, result.amount);
                }
                return message;
            };

            var updateTurns = function() {
                var combatant;

                currentTurn++;

                if (currentTurn === turnsList.length) {
                    currentTurn = 0;
                }

                combatant = turnsList[currentTurn];

                if (partyDB.partyHP() === 0) {
                    userData.gameMode = 'downtime';
                    $location.path('/camp');
                    return;
                }

                if (mobDB.partyHP() === 0) {
                    var earned = mobDB.partyXPGiven() / partyDB.members.length;
                    console.log(earned);
                    partyDB.members.map(function(obj) {
                       obj.character.addXP(earned);
                    });

                    userData.gameMode = 'exploration';
                    $location.path('/gamegrid');
                    return;
                }

                if (combatant.character.npc) {
                    $scope.currentCombatantParty = 'mobs';
                    if (combatant.character.stats.health === 0) {
                        updateTurns();
                        return;
                    } else {
                        var randomPlayer = partyDB.members[Math.floor(Math.random()  *partyDB.members.length)];
                        var actionResult = attack(randomPlayer, combatant.character.abilities[0]);
                        $scope.tells.push(actionResult);
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
                    $scope.currentCombatantParty = 'players';
                    $scope.tells.push(infoText.playerTurn.replace(/PLAYER/, combatant.character.identity.name));

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
            $scope.currentCombatantParty = null;
            $scope.abilitySelected = null;

            $scope.saveAndNext = function (value) {
                var actionsList = {
                    fight: function (actionSelected) {
                        $scope.tells.push(infoText.chooseEnemy);
                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];
                        $scope.context = 'confirmFight';
                    },
                    spell: function (actionSelected) {
                        var combatant = turnsList[currentTurn];
                        $scope.tells.push(infoText.chooseSpell);

                        $scope.availableActions = [];
                        angular.forEach(combatant.character.abilities, function(ability) {
                            $scope.availableActions.push(ability);
                        });

                        $scope.context = 'confirmSpellTarget';
                    },
                    use: function (actionSelected) {
                        $scope.tells.push(infoText.chooseItem);
                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];
                        $scope.context = 'confirmUse';
                    },
                    run: function (actionSelected) {
                        $scope.tells.push(infoText.playerRuns);
                        updateTurns();
                    },
                    next: function (actionSelected) {
                        updateTurns();
                    },
                    confirmFight: function (index) {
                        var lookup = $scope.mobData[index - 1];
                        if (lookup) {
                            $scope.tells.push(attack(lookup, ability.fight));

                            $scope.availableActions = [
                                combatScreenMenuOptions.next
                            ];

                            $scope.context = null;
                        }
                    },
                    confirmSpellTarget: function (actionSelected) {
                        $scope.tells.push(infoText.chooseTargetPlayer);

                        $scope.availableActions = [
                            combatScreenMenuOptions.choosetarget
                        ];
                        $scope.abilitySelected = actionSelected;
                        $scope.context = "confirmSpell";
                    },
                    confirmSpell: function (value) {
                        if ($scope.currentCombatantParty === 'mobs') {
                            $scope.tells.push(attack(mobDB.members[value-1], $scope.abilitySelected));
                        } else {
                            if ($scope.abilitySelected.actionType === 'damage') {
                                $scope.tells.push(attack(mobDB.members[value-1], $scope.abilitySelected));
                            } else {
                                $scope.tells.push(heal(partyDB.members[value-1], $scope.abilitySelected));
                            }
                        }

                        $scope.availableActions = [
                            combatScreenMenuOptions.next
                        ];

                        $scope.context = null;
                    },
                    confirmUse: function (index) {
                        // TO-DO: this is spoofed
                        $scope.tells.push(infoText.chosenThing);

                        $scope.availableActions = [
                            combatScreenMenuOptions.next
                        ];

                        $scope.context = null;
                    }
                };

                if (angular.isNumber(value) && $scope.context) {
                    actionsList[$scope.context](value);
                } else if (actionsList[$scope.context]) {
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
