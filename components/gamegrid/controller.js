angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.levelMap.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location', 'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened',
        function($scope, $location, userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened) {
            'use strict';

            $scope.tells = [];

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
                partyActions.describe
            ];

            $scope.coordinates = [1,1];
            $scope.compassDirection = userData.gameModuleSelected.defaultCompassDirection;

            levelMap.setDimensions(userData.gameModuleSelected.mapWidth, userData.gameModuleSelected.mapHeight);
            levelMap.setDepth(userData.gameModuleSelected.defaultCameraDepth);

            levelMap.init();

            // this needs to come from the game service somehow
            levelMap.updateNode(1,1, 0x02);
            levelMap.updateNode(2,1, 0x02);
            levelMap.updateNode(2,2, 0x02);
            levelMap.updateNode(2,3, 0x02);
            levelMap.updateNode(2,4, 0x02);
            levelMap.updateNode(3,1, 0x02);

            levelMap.updateNode(0,0, 0x01);
            levelMap.updateNode(0,1, 0x01);
            levelMap.updateNode(0,2, 0x01);
            levelMap.updateNode(1,0, 0x01);
            levelMap.updateNode(1,2, 0x01);
            levelMap.updateNode(1,3, 0x01);
            levelMap.updateNode(1,5, 0x01);
            levelMap.updateNode(1,4, 0x01);
            levelMap.updateNode(2,0, 0x01);
            levelMap.updateNode(2,5, 0x01);
            levelMap.updateNode(3,0, 0x01);
            levelMap.updateNode(3,2, 0x01);
            levelMap.updateNode(3,3, 0x01);
            levelMap.updateNode(3,5, 0x01);
            levelMap.updateNode(3,4, 0x01);
            levelMap.updateNode(4,1, 0x01);

            levelMap.debugMap($scope.compassDirection);

            var updateMazeRunner = function() {
                $scope.view = levelMap.getView($scope.coordinates[0],$scope.coordinates[1], $scope.compassDirection);

                // levelMap.debugView($scope.view,$scope.compassDirection);
                mazeRunner($scope.view);

                $scope.map = {
                    zone: {
                        name: userData.gameModuleSelected.name + ": Level One"
                    },
                    location: {
                        coordinates: {
                            x: $scope.coordinates[0],
                            y: $scope.coordinates[1]
                        },
                        compass: $scope.compassDirection
                    }
                };
            };

            updateMazeRunner();


            $scope.saveAndNext = function(value) {
                //// camp takes you to the camp screen
                //// describe gets any metadata abount the current cell

                var compassOptions = ['north','east', 'south', 'west'];
                switch (value._self) {
                    case 'forward':
                        // movement depends on compass
                        var next = $scope.view[1][1];
                        if (next > 1) {
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
                        break
                    case 'describe':
                        break
                }
                updateMazeRunner();
            };

        }
    ]);
