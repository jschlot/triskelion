angular
    .module('triskelion.GameGrid.controller',[])
    .controller('GameGridController', ['$scope', '$location', 'userData',
        function($scope, $location, userData) {
            'use strict';

            $scope.tells = ['one','two'];


            if (userData.gameModuleSelected) {
                $scope.gameModuleSelected = userData.gameModuleSelected;
            } else {
                $location.path( "/startscreen" );
            }

            $scope.map = {
                zone: {
                    name: "Pizza Shop"
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
