/* global angular */
angular
    .module('triskelion.characterSheet.controller',[
        'triskelion.charactersheet.menuOptions.service'
    ])
    .controller('characterSheetController', [
        '$scope', '$location', '$routeParams', 'infoText', 'playerDB', 'hotkeyAction',
        'characterSheetMenuOptions', 'actionDispatcher',
        function($scope, $location, $routeParams, infoText, playerDB, hotkeyAction,
            characterSheetMenuOptions, actionDispatcher) {

            'use strict';

            // the actions list might need to know context or be dynamic
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
