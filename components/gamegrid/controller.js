angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.navigator.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location', 'userData', 'navigator', 'mazeRunner',
        function($scope, $location, userData, navigator, mazeRunner) {
            'use strict';

            $scope.tells = [];
            $scope.coordinates = [0,0];

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            navigator.setDimensions(16,16);

            // there's a wall-rendering bug when you set depth to 3 or more
            navigator.setDepth(2);
            navigator.init();
            navigator.updateNode(0,0, 0x01);
            navigator.updateNode(1,0, 0x01);
            navigator.updateNode(1,1, 0x01);

            var view = navigator.getView($scope.coordinates[0],$scope.coordinates[1], 'east');

            // navigator.debugMap(view);
            // navigator.debugView(view);

            mazeRunner(view);

            $scope.map = {
                zone: {
                    name: "Level One"
                },
                location: {
                    coordinates: {
                        x: $scope.coordinates[0],
                        y: $scope.coordinates[1]
                    },
                    compass: "n"
                }
            };
        }
    ]);
