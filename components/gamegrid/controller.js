angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.levelMap.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
        'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened', 'infoText', 'tileService', 'miniMap',
        function($scope, $location,
            userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened, infoText, tileService, miniMap) {
            'use strict';

            $scope.tells = [];
            $scope.showMiniMap = false;

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            $scope.partyData = partyData

            $scope.availableActions = [
                partyActions.forward,
                partyActions.goleft,
                partyActions.goright,
                partyActions.camp,
                partyActions.describe,
                partyActions.map
            ];

            $scope.coordinates = userData.gameModuleSelected.startingCoordinates;
            $scope.compassDirection = userData.gameModuleSelected.defaultCompassDirection;

            levelMap.setDimensions(userData.gameModuleSelected.mapMaxX, userData.gameModuleSelected.mapMaxY);
            levelMap.setDepth(userData.gameModuleSelected.defaultCameraDepth);

            var currentLevelMap = userData.gameModuleSelected.map[0];
            levelMap.init(currentLevelMap.layout);

            // this needs to come from the game service somehow

            var updateMazeRunner = function() {
                $scope.view = levelMap.getView($scope.coordinates[0],$scope.coordinates[1], $scope.compassDirection);

                // levelMap.debugMap($scope.compassDirection);
                mazeRunner($scope.view);
                levelMap.debugView($scope.view, $scope.compassDirection);

                $scope.map = {
                    zone: {
                        name: userData.gameModuleSelected.name + ": " + currentLevelMap.name
                    },
                    location: {
                        coordinates: {
                            x: $scope.coordinates[0],
                            y: $scope.coordinates[1]
                        },
                        compass: $scope.compassDirection
                    },
                    data: levelMap.getMap()
                };
            };

            updateMazeRunner();

            $scope.saveAndNext = function(value) {
                //// camp takes you to the camp screen
                //// describe gets any metadata abount the current cell

                var compassOptions = ['north','east', 'south', 'west'];
                switch (value._self) {
                    case 'forward':
                        var next = $scope.view[1][1];
                        if (tileService.isForward(next)) {
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
                        } else {
                            $scope.tells = [ouchHappened()];
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
                            $scope.tells = [infoText.campingislovely];
                        break
                    case 'describe':
                        break
                    case 'map':
                        $scope.showMiniMap = ($scope.showMiniMap) ? false : true;
                        if ($scope.showMiniMap) {
                            miniMap(levelMap.getMap())
                            $scope.tells = [infoText.closeminimap];
                            return;
                        }
                        break
                }
                updateMazeRunner();
            };

        }
    ]);
