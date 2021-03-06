/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service', 'triskelion.character.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'mobDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList', 'aurasList', 'diceService', 'actionDispatcher', 'ability',
        function ($scope, $location, accessControl, userData, partyDB, mobDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList, aurasList, diceService, actionDispatcher, ability) {

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

            $scope.tells = tellsList.log;
            $scope.tells.push(tileAction.description);

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

            var attack = function(actor, player, event) {
                var message;
                if (player.character.stats.health > 0) {
                    var result = player.character.damage(event);

                    if (result.amount) {
                        message = infoText.auraDamage
                            .replace(/PLAYER/, player.character.identity.name)
                            .replace(/DAMAGE/, result.amount)
                            .replace(/ACTOR/, actor);
                    } else {
                        message = infoText.auraMissed.replace(/PLAYER/, player.character.identity.name);
                    }

                    if (result.death) {
                        message += infoText.deathNote;
                    }
                }
                return message;
            };

            var heal = function(actor, player, event) {
                var message;
                var result =  player.character.healing(event);
                if (result.hit) {
                    message = infoText.auraHeal
                        .replace(/PLAYER/, player.character.identity.name)
                        .replace(/HEALTH/, result.amount)
                        .replace(/ACTOR/, event.aura);
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

								$scope.page = {
										name: infoText.combatscreen,
										turn: currentTurn,
										who: combatant.character.identity.name,
										spec: combatant.character.identity.spec,
										playericon: "images/" + combatant.character.portrait
								};
								$scope.page.targeticon = null;


                if (partyDB.partyHP() === 0) {
                    userData.gameMode = 'downtime';
                    $location.path('/camp');
                    return;
                }

                if (mobDB.partyHP() === 0) {
                    var given;

                    given = mobDB.partyXPGivenWhenDead();

                    $scope.tells.length = 0;

                    $scope.tells.push(infoText.xpEarned.replace(/POINTS/, given));

                    var isDing = partyDB.addExperiencePoints(given);
                    if (isDing) {
//                        $scope.tells.push(infoText.partyDinged);
                    }

                    tileAction.repeater--;

                    userData.gameMode = 'exploration';
                    $location.path('/gamegrid');
                    return;
                }

                if (combatant.character.npc) {
                    $scope.currentCombatantParty = 'mobs';
                    $scope.tells.push(infoText.playerTurn.replace(/PLAYER/, combatant.character.identity.name));
                    if (combatant.character.stats.health === 0) {
                        updateTurns();
                        return;
                    } else {
											var randomPlayer = partyDB.members[Math.floor(Math.random() * partyDB.members.length)];
											$scope.page.targeticon = 'images/' + randomPlayer.character.portrait;

											$scope.tells.push(infoText.targetSelected
												.replace(/PLAYER/, combatant.character.identity.name)
												.replace(/ACTOR/, randomPlayer.character.identity.name));

											var actionResult = attack(combatant.character.identity.name, randomPlayer, combatant.character.inventory.weapon);
											$scope.tells.push(actionResult);
                     }

                    $scope.availableActions = [
                        combatScreenMenuOptions.next
                    ];

                } else {
                    if (combatant.character.stats.health === 0) {
                        updateTurns();
                        return;
                    } else {

											$scope.page.targeticon = null;
											$scope.currentCombatantParty = 'players';
											$scope.tells.push(infoText.playerTurn.replace(/PLAYER/, combatant.character.identity.name));

											$scope.availableActions = [
													combatScreenMenuOptions.fight,
													combatScreenMenuOptions.spell,
													combatScreenMenuOptions.next
											];
										}
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
													if (ability.level <= partyDB.experience.level) {
                            $scope.availableActions.push(ability);
													}
                        });

                        $scope.context = 'confirmSpellTarget';
                    },
                    next: function (actionSelected) {
                        updateTurns();
                    },
                    confirmFight: function (index) {
                        var lookup = $scope.mobData[index - 1],
													  currentplayer = $scope.page.who;
                        if (lookup) {
														$scope.tells.push(infoText.targetSelected
														 		.replace(/PLAYER/, currentplayer)
														 		.replace(/ACTOR/, lookup.character.identity.name));

														$scope.page.targeticon = 'images/' + lookup.character.portrait;

                            $scope.tells.push(attack(currentplayer, lookup, lookup.character.inventory.weapon));

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
											  var currentplayer = $scope.page.who;

                        if ($scope.currentCombatantParty === 'mobs') {
														$scope.page.targeticon = 'images/' + mobDB.members[value-1].character.portrait;

														$scope.tells.push(infoText.targetSelected
																.replace(/PLAYER/, currentplayer)
																.replace(/ACTOR/, mobDB.members[value-1].character.identity.name));
                            $scope.tells.push(attack(currentplayer, mobDB.members[value-1], $scope.abilitySelected));
                        } else {
                            if ($scope.abilitySelected.actionType === 'damage') {
																$scope.page.targeticon = 'images/' + mobDB.members[value-1].character.portrait;

																$scope.tells.push(infoText.targetSelected
																		.replace(/PLAYER/, currentplayer)
																		.replace(/ACTOR/, mobDB.members[value-1].character.identity.name));
                                $scope.tells.push(attack(currentplayer, mobDB.members[value-1], $scope.abilitySelected));
                            } else {
																$scope.page.targeticon = 'images/' + partyDB.members[value-1].character.portrait;

																$scope.tells.push(infoText.targetSelected
																		.replace(/PLAYER/, currentplayer)
																		.replace(/ACTOR/, partyDB.members[value-1].character.identity.name));
                                $scope.tells.push(heal(currentplayer, partyDB.members[value-1], $scope.abilitySelected));
                            }
                        }

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
						$scope.partyLevel = partyDB.experience.level;

            updateTurns();
        }
    ]);
