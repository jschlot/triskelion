angular
    .module('triskelion.startScreen.controller',[])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        function($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher) {
            'use strict';

            tellsList.push(infoText.choosemodule);

            $scope.tells = tellsList;
            $scope.headerText = infoText.startscreen;

            $scope.availableActions = [
                gameModules.dungeon
            ];

            $scope.saveAndNext = function(value) {
                var actionsList = {
                     partyselect: function(value) {
                        userData.gameModuleSelected = value;
                        tellsList.length = 0;
                        $location.path( "/partyselect" );
                    }
                };

                actionDispatcher(actionsList['partyselect'], value);
            };
        }
    ]);
