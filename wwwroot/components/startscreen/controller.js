/* global angular */
angular
    .module('triskelion.startScreen.controller',[])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        function($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher) {
            'use strict';

            /*
                Developer's Note:
                This is, by far, the simplest of controller modules
                It also happens to be a good starting point for creating new modules
                One principal shown here is using functional programming to dispatch events
                with our actionDispatch service (a simple functional factory)
            */
            
            tellsList.push(infoText.choosemodule);

            $scope.page = {
                name: infoText.startscreen
            };                      

            $scope.availableActions = [
                gameModules.dungeon
            ];

            $scope.tells = tellsList;

            $scope.saveAndNext = function(value) {
                var actionsList = {
                     partyselect: function(value) {
                        userData.gameModuleSelected = value;
                        tellsList.length = 0;
                        $location.path( "/partyselect" );
                    }
                };

                actionDispatcher(actionsList.partyselect, value);
            };
        }
    ]);
