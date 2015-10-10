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

            $scope.coordinates = [0,0];
            navigator.setDimensions(userData.gameModuleSelected.mapWidth, userData.gameModuleSelected.mapHeight);
            // there's a wall-rendering bug when you set depth to 3 or more
            navigator.setDepth(userData.gameModuleSelected.defaultCameraDepth);

            navigator.init();

            // this needs to come from the game service somehow
            navigator.updateNode(0,0, 0x01);
            navigator.updateNode(1,0, 0x01);
            navigator.updateNode(1,1, 0x01);

            $scope.view = navigator.getView($scope.coordinates[0],$scope.coordinates[1], userData.gameModuleSelected.defaultCompassDirection);

            //navigator.debugMap($scope.view);
            // navigator.debugView(view);

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
                    compass: "n"
                }
            };


            $scope.saveAndNext = function(value) {
                // put in code to handle events caught from the saytell
                //// forward, left and right do map functions
                //// camp takes you to the camp screen
                //// describe gets any metadata abount the current cell
                console.debug(value);
            };

        }
    ]);
