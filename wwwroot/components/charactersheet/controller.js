/* global angular */
angular
    .module('triskelion.characterSheet.controller',['triskelion.charactersheet.menuOptions.service'])
    .controller('characterSheetController', [
        '$scope', '$location', '$routeParams', 'infoText', 'playerDB', 'hotkeyAction',
        'characterSheetMenuOptions', 'actionDispatcher',
        function($scope, $location, $routeParams, infoText, playerDB, hotkeyAction,
            characterSheetMenuOptions, actionDispatcher) {

            'use strict';

            /*
                Developer's Note:
                This is, by far, the simplest of controller modules
                It also happens to be a good starting point for creating new modules
                One principal shown here is using functional programming to dispatch events
                with our actionDispatch service
            */

            $scope.saveAndNext = function(value) {
                var actionsList = {
                    confirm: function(actionSelected) {
                        $scope.tells = [];
                        $location.path( "/camp" );
                    },
                    backtoselect: function(actionSelected) {
                        $scope.tells = [];
                        $location.path( "/camp" );
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.loadedCharacter = {};
            angular.forEach(playerDB.dungeon, function(value, key) {
                if (value._this === $routeParams.characterkey) {
                    $scope.loadedCharacter = value;
                }
            });

            $scope.page = {
               name: infoText.charactersheet.replace(/CHARACTER/, $scope.loadedCharacter.name)
            };

            $scope.availableActions = [
                characterSheetMenuOptions.confirm,
                characterSheetMenuOptions.backtoselect
            ];


            $scope.tells = [];
            for (var i=0; i<$scope.availableActions.length; i++) {
                $scope.tells.push(hotkeyAction($scope.availableActions[i]));
            }

        }
    ]);
