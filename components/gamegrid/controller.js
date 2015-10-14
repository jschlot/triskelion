angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.levelMap.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
        'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened', 'infoText', 'tileService', 'miniMap', 'auraMethods', 'tellsList',
        function($scope, $location,
            userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened, infoText, tileService, miniMap, auraMethods, tellsList) {
            'use strict';

            $scope.tells = tellsList;
            $scope.auras = [];
            $scope.showMiniMap = false;

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            $scope.availableActions = [
                partyActions.forward,
                partyActions.goleft,
                partyActions.goright,
                partyActions.camp,
                partyActions.describe,
                partyActions.map
            ];

            $scope.partyData = partyData;

            $scope.coordinates = userData.gameModuleSelected.startingCoordinates;
            $scope.compassDirection = userData.gameModuleSelected.defaultCompassDirection;

            levelMap.setDimensions(userData.gameModuleSelected.mapMaxX, userData.gameModuleSelected.mapMaxY);
            levelMap.setDepth(userData.gameModuleSelected.defaultCameraDepth);

            var currentLevelMap = userData.gameModuleSelected.map[0];
            levelMap.init(currentLevelMap.layout);

            var updateMazeRunner = function() {
                $scope.view = levelMap.getView($scope.coordinates[0],$scope.coordinates[1], $scope.compassDirection);

                mazeRunner($scope.view);

                $scope.map = {
                    zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                    location: {
                        coordinates: { x: $scope.coordinates[0], y: $scope.coordinates[1] },
                        compass: $scope.compassDirection
                    },
                    data: levelMap.getMap()
                };
            };

            $scope.saveAndNext = function(value) {
                var compassOptions = ['north','east', 'south', 'west'];

                tellsList = [];
                var msg = [];

                for (var i=0; i < $scope.auras.length; i++) {
                    tellsList = tellsList.concat(auraMethods[$scope.auras[i].aura]($scope.auras[i]));
                    $scope.auras[i].remaining--;
                }

                for (var i=0; i < $scope.auras.length; i++) {
                    if ($scope.auras[i].remaining === 0) {
                        $scope.auras.splice(i,1);
                    }
                }

                switch (value._self) {
                    case 'forward':
                        $scope.view.reverse();
                        var next = $scope.view[1][1];
                        if (tileService.canGoForward(next)) {
                            switch($scope.compassDirection) {
                                case "east":
                                    $scope.coordinates[0] = $scope.coordinates[0] + 1;
                                    break;
                                case "west":
                                    $scope.coordinates[0] = $scope.coordinates[0] - 1;
                                    break;
                                case "north":
                                    $scope.coordinates[1] = $scope.coordinates[1] - 1;
                                    break;
                                case "south":
                                    $scope.coordinates[1] = $scope.coordinates[1] + 1;
                                    break;
                            }

                            var actionID = "action_" + next;
                            /*
                            if (userData.gameModuleSelected.tileAction[actionID]) {
                                var actionStack = userData.gameModuleSelected.tileAction[actionID];
                                for (var i=0; i<actionStack.length; i++) {
                                    if (actionStack[i].tell) {
                                        tellsList.push(actionStack[i].tell);
                                    }
                                    if (actionStack[i].aura) {
                                        var results = auraMethods[actionStack[i].aura](actionStack[i]);
                                        actionStack[i].remaining = actionStack[i].turns;
                                        $scope.auras[$scope.auras.length] = actionStack[i];
                                        tellsList = tellsList.concat(results);
                                    }
                                }
                            }
                            */
                        } else {
                            tellsList = [ouchHappened()];
                        }
                        break
                    case 'left':
                        var currentCompassIndex = compassOptions.indexOf($scope.compassDirection);
                        currentCompassIndex--;
                        if (currentCompassIndex < 0) {
                            currentCompassIndex = compassOptions.length-1;
                        }
                        $scope.compassDirection = compassOptions[currentCompassIndex];
                        break
                    case 'right':
                        var currentCompassIndex = compassOptions.indexOf($scope.compassDirection);
                        currentCompassIndex++;
                        if (currentCompassIndex === compassOptions.length) {
                            currentCompassIndex = 0;
                        }
                        $scope.compassDirection = compassOptions[currentCompassIndex];
                        break
                    case 'camp':
                            //// camp takes you to the camp screen
                            $scope.tells = tellsList.concat(infoText.campingislovely);

                            $scope.coordinates[0] = 1;
                            $scope.coordinates[1] = 1;
                            $scope.compassDirection = 'east';
//                            return;
                        break
                    case 'describe':
                            //// describe gets any metadata abount the current cell
                            $scope.tells = tellsList.concat("HACK - d now opens doors");
                            levelMap.updateTile(6,4,0x012);
//                            return;
                        break
                    case 'map':
                        $scope.showMiniMap = ($scope.showMiniMap) ? false : true;
                        if ($scope.showMiniMap) {
                            miniMap(levelMap.getMap())
                            $scope.tells = tellsList.concat(infoText.closeminimap);
                            return;
                        }
                        break
                }

                if (tellsList) {
                    $scope.tells = tellsList;
                }

                updateMazeRunner();
            };

            updateMazeRunner();
        }
    ]);
