angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
        '$scope', '$location', 'partyActions', 'infoText', 'userData',
        function($scope, $location, partyActions, infoText, userData) {
            'use strict';

            $scope.tells = [];

            if (userData.gameModuleSelected) {
                $scope.tells.push(infoText.actionchoice.replace(/STRING/, userData.gameModuleSelected.name));
                $scope.gameModuleSelected = userData.gameModuleSelected._self;
            } else {
                $location.path( "/startscreen" );
                return;
            }

            $scope.availableActions = [
                partyActions.add,
                partyActions.remove
            ];

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


            $scope.saveAndNext = function(value) {
                $scope.tells = [value.name];
                $scope.availableActions = [
                    partyActions.add,
                    partyActions.remove
                ];
            };

        }
    ]);
