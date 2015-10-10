angular
    .module('triskelion.gameGrid.controller',[])
    .controller('gameGridController', ['$scope', '$location', 'userData', 'navigator',
        function($scope, $location, userData, navigator) {
            'use strict';

            $scope.tells = [];

            if (userData.gameModuleSelected) {
                $scope.tells = ["you chose " + userData.gameModuleSelected.name];
                $scope.gameModuleSelected = userData.gameModuleSelected._self;
            } else {
                $location.path( "/startscreen" );
                return;
            }

            navigator.setDimensions(16,16);
            navigator.init();
            navigator.updateNode(1,0, 0x01);
            var view = navigator.getView(0,0, 'east');

            console.debug(view);

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
