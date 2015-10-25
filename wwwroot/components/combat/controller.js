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

            var updateTurns = function() {
                var combatant;

                currentTurn++;

                if (currentTurn === turnsList.length) {
                    currentTurn = 0;
                }

                combatant = turnsList[currentTurn];

                if (combatant.character.npc) {
                    $scope.tells = [infoText.npcTurn.replace(/NPC/, combatant.character.identity.name)];

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
// TO-DO: Make happen
                            $scope.tells = [
                                infoText.playerDoesDamage
                                .replace(/TARGET/, lookup.character.identity.name)
                            ];

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
// TO-DO: Make happen

                        if ($scope.subcontext === 'mobs') {
                            $scope.tells = [
                                infoText.playerCastsSpell
                                .replace(/TARGET/, mobDB.members[value-1].character.identity.name)
                                .replace(/SPELL/, $scope.abilitySelected.name)
                            ];
                        } else {
                            $scope.tells = [
                                infoText.playerCastsSpell
                                .replace(/TARGET/, partyDB.members[value-1].character.identity.name)
                                .replace(/SPELL/, $scope.abilitySelected.name)
                            ];
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
