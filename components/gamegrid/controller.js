angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.navigator.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location', 'userData', 'navigator', 'mazeRunner',
        function($scope, $location, userData, navigator, mazeRunner) {
            'use strict';

            $scope.tells = [];

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            navigator.setDimensions(16,16);
            navigator.setDepth(2);
            navigator.init();
            navigator.updateNode(0,0, 0x01);
//            navigator.updateNode(1,0, 0x01);
            navigator.updateNode(1,1, 0x01);

            var view = navigator.getView(0,0, 'east');
//            navigator.debugMap(view);
            navigator.debugView(view);

            mazeRunner(view);

            $scope.map = {
                zone: {
                    name: "Party Select"
                },
                location: {
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    compass: "n"
                }
            };
        }
    ]);
