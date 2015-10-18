/* global angular */
angular
    .module('triskelion.gameGrid.controller',[])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened', 'infoText',
            'tileService', 'tellsList', 'mapModal', 'actionDispatcher', 'diceService', 
        function($scope, $location,
            userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened, infoText,
            tileService, tellsList, mapModal, actionDispatcher, diceService) {

            'use strict';

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            var currentLevel = userData.currentMapLevel,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                currentCompassIndex,
                compassOptions = ['north','east', 'south', 'west'],
                coordinates = userData.gameModuleSelected.startingCoordinates,
                compassDirection = userData.gameModuleSelected.defaultCompassDirection,
                actionsList = {};

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            actionsList = {
                'forward': function() {
                    var currentTileIndex = $scope.view.length - 2;
                    var next = $scope.view[currentTileIndex][1];
                    if (tileService.canGoForward(next)) {
                        switch(compassDirection) {
                            case "east":
                                coordinates[0] = coordinates[0] + 1;
                                break;
                            case "west":
                                coordinates[0] = coordinates[0] - 1;
                                break;
                            case "north":
                                coordinates[1] = coordinates[1] - 1;
                                break;
                            case "south":
                                coordinates[1] = coordinates[1] + 1;
                                break;
                        }
                    } else {
                        mapModal(ouchHappened());
                        return 'stop mazerunner';
                    }
                },
                'left': function() {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex--;
                    if (currentCompassIndex < 0) {
                        currentCompassIndex = compassOptions.length-1;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                },
                'right': function() {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex++;
                    if (currentCompassIndex === compassOptions.length) {
                        currentCompassIndex = 0;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                },
                'camp': function() {
                    tellsList = [infoText.campingislovely];
                    $scope.tells = tellsList;
                },
                'describe': function() {
                    //// describe gets any metadata abount the current cell
                },
                'map': function() {
                    $location.path( "/mapscreen" );
                },
                'updateMazeRunner': function() {
                    $scope.view = levelMap.getView(coordinates[0],coordinates[1], compassDirection);
        
                    console.log(diceService.roll(3,4));
        
                    $scope.page = {
                        zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                        location: {
                            coordinates: { x: coordinates[0], y: coordinates[1] },
                            compass: compassDirection
                        },
                        data: levelMap.getMap()
                    };
    
                    mazeRunner($scope.view);
                }                
            };

            $scope.saveAndNext = function(value) {
                tellsList.length = 0;

                var returnValue = actionDispatcher(actionsList[value._self], value);
                if (returnValue !== 'stop mazerunner') {
                    actionsList.updateMazeRunner();
                }
            };

            $scope.tells = tellsList;
            $scope.partyData = partyData;
            $scope.auras = []; // is this right? maybe we don't want to always reset auras???

            $scope.availableActions = [
                partyActions.forward,
                partyActions.goleft,
                partyActions.goright,
                partyActions.camp,
                partyActions.describe,
                partyActions.map
            ];

            actionsList.updateMazeRunner();

        }
    ]);

/* global angular */
angular
    .module('triskelion.mapScreen.controller',[])
    .controller('mapScreenController', [
            '$scope', '$location', 'gameModules', 'infoText', 'userData', 'partyData', 'tellsList', 'partyActions', 
            'actionDispatcher', 'levelMap', 'miniMap',
        function($scope, $location, gameModules, infoText, userData, partyData, tellsList, partyActions, 
            actionDispatcher, levelMap, miniMap) {
            
            'use strict';

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            var currentLevel = userData.currentMapLevel,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.gameModuleSelected.startingCoordinates,
                compassDirection = userData.gameModuleSelected.defaultCompassDirection;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            miniMap(levelMap.getMap());
          
            $scope.saveAndNext = function(value) {
                var actionsList = {
                     returntogame: function(value) {
                        tellsList.length = 0;
                        $location.path( "/gamegrid" );
                    }
                };

                actionDispatcher(actionsList.returntogame, value);
            };

            $scope.page = {
                name: infoText.mapscreen
            };                      

            $scope.page = {
                zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                location: {
                    coordinates: { x: coordinates[0], y: coordinates[1] },
                    compass: compassDirection
                }
            };

            $scope.availableActions = [
                partyActions.returntogame
            ];
            
            $scope.tells = [
                "R)eturn to game"               
            ];
                        
        }
    ]);

/* global angular */
angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
            '$scope', '$location', 'partySelectActions', 'infoText', 'userData', 
            'playerDB', 'partyData', 'tellsList', 'objectFindByKey', 'actionDispatcher',
        function($scope, $location, partySelectActions, infoText, userData, 
            playerDB, partyData, tellsList, objectFindByKey, actionDispatcher) {

            'use strict';

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            var allPlayers = playerDB[userData.gameModuleSelected._self],
                currentPick = {},
                context = null,
                actionsList = {},
                cast = [];

            tellsList.push(infoText.actionchoice.replace(/STRING/, userData.gameModuleSelected.name));

            cast = allPlayers.filter( function( el ) {
                var lookup = objectFindByKey(partyData, 'hotkey', el.hotkey);
                return lookup ? false : el;
            });
            
            actionsList = {
                'add': function() {
                    tellsList = [infoText.whowilljoin];                   
                    $scope.availableActions = angular.copy(cast);
                    $scope.availableActions.push(partySelectActions.back);
                    context = 'add';
                 },
                'remove': function() {
                    tellsList = [infoText.removePlayer];
                    $scope.availableActions = angular.copy(partyData);
                    $scope.availableActions.push(partySelectActions.back);
                    context = 'remove';
                 },
                 'start': function() {
                    $location.path( "/gamegrid" );
                    return;
                 },
                 'quit': function() {
                    $location.path( "/startscreen" );
                    return;
                 },
                 'mainActions': function() {
                    if (partyData.length === userData.gameModuleSelected.maxparty) {
                        $scope.availableActions = [
                            partySelectActions.remove,
                            partySelectActions.start,
                            partySelectActions.quit
                        ];
                    } else if (partyData.length === 0) {
                        $scope.availableActions = [
                            partySelectActions.add,
                            partySelectActions.quit
                        ];
                    } else {
                        $scope.availableActions = [
                            partySelectActions.add,
                            partySelectActions.remove,
                            partySelectActions.start,
                            partySelectActions.quit
                        ];
                    }
                 },
                 'back': function() {
                    actionsList.mainActions();
                 },
                 'backtoselect': function() {
                    actionsList.add();
                 },
                 'describePlayer': function(value) {
                    var abilityList = [];
                    for (var i = 0; i < value.abilities.length; i++) {
                        abilityList.push(value.abilities[i].name);
                    }

                    tellsList = [
                        infoText.keys.name.replace(/VALUE/, value.name),
                        infoText.keys.race.replace(/VALUE/, value.race),
                        infoText.keys.type.replace(/VALUE/, value.type),
                        infoText.keys.health.replace(/VALUE/, value.health),
                        infoText.keys.abilities.replace(/VALUE/, abilityList.join(", "))
                    ];
                    $scope.availableActions = [
                        partySelectActions.confirmAdd,
                        partySelectActions.backtoselect
                    ];
                 },
                 'confirmAdd': function() {
                    var lookup = objectFindByKey(cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = cast.indexOf(lookup);
                        if (index > -1) {
                            cast.splice(index,1);
                        }                        
                    }

                    if (partyData.length < userData.gameModuleSelected.maxparty) {
                        tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                        partyData.push(currentPick);
                        $scope.partyData = partyData;
                    }
                    
                    $scope.availableActions.length = 0;
                    
                    actionsList.mainActions();
                 },
                 'confirmRemove': function() {
                    var lookup = objectFindByKey(partyData, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = partyData.indexOf(lookup);
                        if (index > -1) {
                            partyData.splice(index,1);
                            $scope.availableActions.splice(index,1);
                        }
                    }

                    tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                    cast.push(currentPick);
 
                    $scope.partyData = partyData;

                    actionsList.mainActions();
                }
            };

            $scope.saveAndNext = function(value) {
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else {
                    currentPick = {};
                    angular.copy(value, currentPick);

                    if (context === 'remove') {
                        actionsList.confirmRemove();
                    } else { 
                        actionsList.describePlayer(value);                    
                    }
                }
                $scope.tells = tellsList;
            };

            $scope.page = {
                name: infoText.partyselect
            };
            $scope.tells = tellsList;
            $scope.partyData = partyData;

            actionsList.mainActions();            
        }
    ]);

/* global angular */
angular
    .module('triskelion.startScreen.controller',[])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        function($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher) {
            'use strict';

            /*
                Developer's Note:
                This is, by far, the simplest of controller modules
                It also happens to be a good starting point for creating new modules
                One principal shown here is using functional programming to dispatch events
                with our actionDispatch service (a simple functional factory)
            */
            
            tellsList = [infoText.choosemodule];

            $scope.saveAndNext = function(value) {
                var actionsList = {
                     partyselect: function(value) {
                        userData.gameModuleSelected = value;
                        tellsList.length = 0;
                        $location.path( "/partyselect" );
                    }
                };

                actionDispatcher(actionsList.partyselect, value);
            };

            $scope.page = {
                name: infoText.startscreen
            };                      

            $scope.availableActions = [
                gameModules.dungeon
            ];

            $scope.tells = tellsList;
        }
    ]);
