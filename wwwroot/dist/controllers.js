/* global angular */
angular
    .module('triskelion.camp.controller',['triskelion.camp.service'])
    .controller('campController', [
            '$scope', '$location', '$window', 'campActions', 'infoText', 'userData',
            'playerDB', 'partyDB', 'tellsList', 'objectFindByKey', 'actionDispatcher', 'accessControl',
        function ($scope, $location, $window, campActions, infoText, userData,
            playerDB, partyDB, tellsList, objectFindByKey, actionDispatcher, accessControl) {
            'use strict';

            var check = accessControl.check('downtime')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            var allPlayers = playerDB,
                currentPick = {},
                context = null,
                actionsList = {},
                cast = [];

            cast = allPlayers.filter(function (player) {
                var lookup = objectFindByKey(partyDB.members, 'hotkey', player.hotkey);
                return lookup ? false : player;
            });

            actionsList = {
                'add': function () {
                    $scope.tells.push(infoText.whowilljoin);

                    $scope.availableActions = [];
                    angular.forEach(cast, function(player) {
                         $scope.availableActions.push(player);
                    });
                    $scope.availableActions.push(campActions.back);
                    context = 'add';
                },
                'remove': function () {
                    $scope.tells.push(infoText.removePlayer);

                    $scope.availableActions = [];
                    angular.forEach(partyDB.members, function(player) {
                         $scope.availableActions.push(player);
                    });
                    $scope.availableActions.push(campActions.back);
                    context = 'remove';
                },
                'viewplayer': function (value) {
                    var lookup = partyDB.members[value - 1];
                    if (lookup) {
                        $location.path('/charactersheet/' + lookup._this);
                    }
                    return;
                },
                'enter': function () {
                    userData.gameMode = 'exploration';
                    $location.path('/gamegrid');
                    return;
                },
                'quit': function () {
                    // force a reload to completely reload state
                    $location.path('/startscreen');
                    return;
                },
                'mainActions': function () {
                    if (partyDB.members.length === userData.gameModuleSelected.maxparty) {
                        $scope.availableActions = [
                            campActions.viewplayer,
                            campActions.remove,
                            campActions.enter,
                            campActions.quit
                        ];
                    } else if (partyDB.members.length === 0) {
                        $scope.availableActions = [
                            campActions.add,
                            campActions.quit
                        ];
                    } else {
                        $scope.availableActions = [
                            campActions.viewplayer,
                            campActions.add,
                            campActions.remove,
                            campActions.enter,
                            campActions.quit
                        ];
                    }
                },
                'back': function () {
                    actionsList.mainActions();
                },
                'backtoselect': function () {
                    actionsList.add();
                },
                'describePlayer': function (player) {
                    var abilityList = [], character = player.character;

                    angular.forEach(character.abilities, function (ability, key) {
                        if (!angular.equals({}, ability)) {
                            this.push(ability.name);
                        }
                    }, abilityList);

                    $scope.tells.push(
                        infoText.describeCharacter
                            .replace(/NAME/, character.identity.name)
                            .replace(/RACE/, character.identity.race)
                            .replace(/SPEC/, character.identity.spec)
                    );

                    $scope.availableActions = [
                        campActions.confirmAdd,
                        campActions.backtoselect
                    ];
                },
                'confirmAdd': function () {
                    var index, lookup = objectFindByKey(cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        index = cast.indexOf(lookup);
                        if (index > -1) {
                            cast.splice(index,1);
                        }
                    }

                    if (partyDB.members.length < userData.gameModuleSelected.maxparty) {
                        $scope.tells.push(infoText.actionchoice.replace(/STRING/, currentPick.name));
                        partyDB.members.push(currentPick);
                        $scope.partyData = partyDB.members;
                    }

                    $scope.availableActions.length = 0;

                    actionsList.mainActions();
                },
                'confirmRemove': function () {
                    var index, lookup = partyDB.getMember('hotkey', currentPick.hotkey);
                    if (lookup) {
                        index = partyDB.members.indexOf(lookup);
                        if (index > -1) {
                            partyDB.members.splice(index,1);
                            $scope.availableActions.splice(index,1);
                        }
                    }

                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, currentPick.name));
                    cast.push(currentPick);

                    $scope.partyData = partyDB.members;

                    actionsList.mainActions();
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else if (angular.isNumber(value)) {
                    actionsList.viewplayer(value);
                } else {
                    currentPick = {};
                    angular.copy(value, currentPick);

                    if (context === 'remove') {
                        actionsList.confirmRemove();
                    } else {
                        actionsList.describePlayer(value);
                    }
                }
            };

            $scope.page = {
                name: infoText.camp
            };

            $scope.tells = tellsList.log;

            $scope.partyData = partyDB.members;
						$scope.partyLevel = partyDB.experience.level;

            actionsList.mainActions();
        }
    ]);

/* global angular */
angular
    .module('triskelion.characterSheet.controller',[
        'triskelion.charactersheet.service'
    ])
    .controller('characterSheetController', [
        '$scope', '$location', '$routeParams', 'infoText', 'partyDB', 'userData', 'hotkeyAction',
        'characterSheetMenuOptions', 'actionDispatcher', 'accessControl', 'tellsList',
        function ($scope, $location, $routeParams, infoText, partyDB, userData, hotkeyAction,
            characterSheetMenuOptions, actionDispatcher, accessControl, tellsList) {
            'use strict';

            var check = accessControl.check('downtime')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            // the actions list might need to know context or be dynamic
            $scope.saveAndNext = function (value) {
                var actionsList = {
                    backtoselect: function (actionSelected) {
                        $location.path('/camp');
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.loadedCharacter = partyDB.getMember("_this", $routeParams.characterkey);

            $scope.page = {
                name: infoText.charactersheet.replace(/CHARACTER/, $scope.loadedCharacter.name)
            };

            $scope.availableActions = [
                characterSheetMenuOptions.backtoselect
            ];

            $scope.tells = tellsList.log;
        }
    ]);

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

/* global ; */
/* global angular */
angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.gamegrid.mapModal.service', 'triskelion.gamegrid.menuOptions.service',
        'triskelion.gamegrid.mazeRunner.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyDB', 'levelMap', 'mazeRunner', 'gameGridMenuOptions', 'ouchHappened', 'infoText',
            'tileService', 'tellsList', 'aurasList', 'mapModal', 'actionDispatcher', 'accessControl',
        function ($scope, $location,
            userData, partyDB, levelMap, mazeRunner, gameGridMenuOptions, ouchHappened, infoText,
            tileService, tellsList, aurasList, mapModal, actionDispatcher, accessControl) {
            'use strict';

            var check = accessControl.check('exploration')();
            if (!check) {
                if (userData.gameMode === 'combat') {
                    $location.path('/combat');
                } else {
                    $location.path('/camp');
                }
                return;
            }

            var currentLevel = userData.cursor.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                currentCompassIndex,
                compassOptions = ['north','east', 'south', 'west'],
                coordinates = userData.cursor.coordinates,
                compassDirection = userData.cursor.direction,
                actionsList = {},
                menuOptions = gameGridMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            actionsList = {
                'forward': function () {
                    var nextTileIndex = $scope.view.length - 2,
                        next = $scope.view[nextTileIndex][1],
                        mode;

                    if (tileService.canGoForward(next)) {
                        switch (compassDirection) {
                            case 'east':
                                coordinates[0] = coordinates[0] + 1;
                                break;
                            case 'west':
                                coordinates[0] = coordinates[0] - 1;
                                break;
                            case 'north':
                                coordinates[1] = coordinates[1] - 1;
                                break;
                            case 'south':
                                coordinates[1] = coordinates[1] + 1;
                                break;
                        }

                        userData.cursor.tile = next;
                        mode = tileService.action({_self: next, party: $scope.partyData, tells: $scope.tells});
                        if (mode !== 'exploration') {
                            userData.gameMode = mode;
                            $location.path('/' + mode);
                            return 'stop mazerunner';
                        }
                    } else {
                        mapModal(ouchHappened());
                        return 'stop mazerunner';
                    }
                },
                'left': function () {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex--;
                    if (currentCompassIndex < 0) {
                        currentCompassIndex = compassOptions.length - 1;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                    userData.cursor.direction = compassDirection;
                },
                'right': function () {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex++;
                    if (currentCompassIndex === compassOptions.length) {
                        currentCompassIndex = 0;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                    userData.cursor.direction = compassDirection;
                },
                'camp': function () {
                    userData.gameMode = 'downtime';
                    $location.path('/camp');
                },
                'map': function () {
                    $location.path('/mapscreen');
                },
                'updateMazeRunner': function () {
                    $scope.view = levelMap.getView(coordinates[0],coordinates[1], compassDirection);

                    $scope.page = {
                        zone: {name: userData.gameModuleSelected.name + ': ' + currentLevelMap.name},
                        location: {
                            coordinates: {x: coordinates[0], y: coordinates[1]},
                            compass: compassDirection
                        },
                        data: levelMap.getMap()
                    };

                    mazeRunner($scope.view);

                    // check to see if everyone is dead
                    if (partyDB.partyHP() < 1) {
                        $scope.availableActions = [
                            menuOptions.camp
                        ];
                        $scope.tells.push(infoText.alldead);
                    }
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                var returnValue = actionDispatcher(actionsList[value._self], value);
                if (returnValue !== 'stop mazerunner') {
                    actionsList.updateMazeRunner();
                }
            };

            $scope.tells = tellsList.log;
            $scope.partyData = partyDB.members;
            $scope.auras = aurasList.log;
						$scope.partyLevel = partyDB.experience.level;

            $scope.availableActions = [
                menuOptions.forward,
                menuOptions.goleft,
                menuOptions.goright,
                menuOptions.camp,
                menuOptions.map
            ];

            actionsList.updateMazeRunner();
        }
    ]);

/* global angular */
angular
    .module('triskelion.mapScreen.controller',[
        'triskelion.mapscreen.miniMap.service', 'triskelion.mapscreen.menuOptions.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('mapScreenController', [
            '$scope', '$location', 'infoText', 'userData', 'partyDB', 'tellsList', 'mapScreenMenuOptions',
            'actionDispatcher', 'levelMap', 'miniMap', 'hotkeyAction', 'accessControl',
        function ($scope, $location, infoText, userData, partyDB, tellsList, mapScreenMenuOptions,
            actionDispatcher, levelMap, miniMap, hotkeyAction, accessControl) {
            'use strict';

            var check = accessControl.check('exploration')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            var currentLevel = userData.cursor.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.cursor.coordinates,
                menuOptions = mapScreenMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);
            miniMap(levelMap.getMap());

            $scope.saveAndNext = function (value) {
                var actionsList = {
                    returntogame: function (actionSelected) {
                        $location.path('/gamegrid');
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.page = {
                name: infoText.mapscreen
            };

            $scope.page = {
                zone: {name: userData.gameModuleSelected.name + ': ' + currentLevelMap.name},
                location: {
                    coordinates: {x: coordinates[0], y: coordinates[1]},
                    compass: 'map'
                }
            };

            $scope.availableActions = [
                menuOptions.returntogame
            ];

            $scope.tells = tellsList.log;
        }
    ]);

/* global angular */
angular
    .module('triskelion.recapScreen.controller',['triskelion.recapscreen.service'])
    .controller('recapScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'recapScreenMenuOptions',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        recapScreenMenuOptions) {

            'use strict';

            if (userData.gameMode !== 'recap') {
                $location.path('/startscreen');
            }

            var actionsList = {
                playagain: function() {
                    $location.path('/startscreen');
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                }
            };

            $scope.page = {
                name: infoText.recapscreen
            };

            $scope.availableActions = [
                recapScreenMenuOptions.playagain
            ];

            $scope.tells = tellsList.log;
            $scope.tells.length = 0;
        }
    ]);

/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service','triskelion.character.hero.factory'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'startScreenMenuOptions', 'objectFindByKey', 'aurasList', 'partyDB', 'heroMaker',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        startScreenMenuOptions, objectFindByKey, aurasList, partyDB, heroMaker) {

            'use strict';

            var actionsList = {
                newgame: function (actionSelected) {
                    $scope.tells.push(infoText.choosemodule);

                    // a new game should reset userData, partyDB, aurasList
                    aurasList.log.length = 0;

                    userData.gameModuleSelected = null;
                    userData.gameMode = 'downtime';
                    userData.cursor = {};

                    partyDB.members.length = 0;

                    $scope.availableActions = [
                        gameModules.dungeon
                    ];
                },
                createNewGame: function (actionSelected) {
                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, actionSelected.name));

                    // TO-DO: should perform a deep copy or should go to factory to generate the instance.
                    // right now it's NOT an instance, it's a reference, so we don't get to replay a module

                    userData.gameModuleSelected = actionSelected;
                    userData.gameMode = 'downtime';
                    userData.cursor.level = actionSelected.defaultLevel;
                    userData.cursor.direction = actionSelected.defaultCompassDirection;
                    userData.cursor.coordinates = actionSelected.startingCoordinates;

                    $location.path('/camp');
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else {
                    actionDispatcher(actionsList.createNewGame, value);
                }
            };

            $scope.page = {
                name: infoText.startscreen
            };

            $scope.availableActions = [
                startScreenMenuOptions.newgame
            ];

            $scope.tells = tellsList.log;
            $scope.tells.length = 0;
        }
    ]);
