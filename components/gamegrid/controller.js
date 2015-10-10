angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.navigator.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location', 'userData', 'partyData', 'navigator', 'mazeRunner', 'partyActions',
        function($scope, $location, userData, partyData, navigator, mazeRunner, partyActions) {
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
            $scope.CompassDirection = userData.gameModuleSelected.defaultCompassDirection;

            navigator.setDimensions(userData.gameModuleSelected.mapWidth, userData.gameModuleSelected.mapHeight);
            navigator.setDepth(userData.gameModuleSelected.defaultCameraDepth);

            navigator.init();

            // this needs to come from the game service somehow
            navigator.updateNode(1,1, 0x02);
            navigator.updateNode(2,1, 0x02);
            navigator.updateNode(2,2, 0x02);
            navigator.updateNode(2,3, 0x02);
            navigator.updateNode(2,4, 0x02);
            navigator.updateNode(3,1, 0x02);

            navigator.updateNode(1,0, 0x01);
            navigator.updateNode(1,2, 0x01);
            navigator.updateNode(1,3, 0x01);
            navigator.updateNode(1,4, 0x01);
            navigator.updateNode(2,0, 0x01);
            navigator.updateNode(2,5, 0x01);
            navigator.updateNode(3,0, 0x01);
            navigator.updateNode(3,2, 0x01);
            navigator.updateNode(3,3, 0x01);
            navigator.updateNode(3,4, 0x01);
            navigator.updateNode(4,1, 0x01);

            navigator.debugMap($scope.view);

            var updateMazeRunner = function() {
                $scope.view = navigator.getView($scope.coordinates[0],$scope.coordinates[1], $scope.CompassDirection);

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
                        compass: $scope.CompassDirection
                    }
                };
            };

            updateMazeRunner();


            $scope.saveAndNext = function(value) {
                // put in code to handle events caught from the saytell
                // this is how player select's switchboard should be in some ways
                //// forward, left and right do map functions
                //// camp takes you to the camp screen
                //// describe gets any metadata abount the current cell
                console.debug(value._self);
                switch (value._self) {
                    case 'forward':
                        // movement depends on compass
                        // need collision detection
                        $scope.coordinates[0] = $scope.coordinates[0] + 1;
                        updateMazeRunner();
                        break
                    case 'left':
                        $scope.CompassDirection = 'north';
                        updateMazeRunner();
                        break
                    case 'right':
                        $scope.CompassDirection = 'south';
                        updateMazeRunner();
                        break
                    case 'camp':
                        break
                    case 'describe':
                        break
                }
            };

        }
    ]);
