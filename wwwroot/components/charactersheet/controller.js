/* global angular */
angular
    .module('triskelion.characterSheet.controller',[
        'triskelion.charactersheet.service'
    ])
    .controller('characterSheetController', [
        '$scope', '$location', '$routeParams', 'infoText', 'partyData', 'userData', 'hotkeyAction',
        'characterSheetMenuOptions', 'actionDispatcher', 'accessControl',
        function ($scope, $location, $routeParams, infoText, partyData, userData, hotkeyAction,
            characterSheetMenuOptions, actionDispatcher, accessControl) {
            'use strict';

            var check = accessControl.check('exploration', userData.gameMode, partyData.length)();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            // the actions list might need to know context or be dynamic
            $scope.saveAndNext = function (value) {
                var actionsList = {
                    backtoselect: function (actionSelected) {
                        $scope.tells = [];
                        $location.path('/camp');
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.loadedCharacter = {};
            angular.forEach(partyData, function (value, key) {
                if (value._this === $routeParams.characterkey) {
                    $scope.loadedCharacter = value;
                }
            });

            $scope.page = {
                name: infoText.charactersheet.replace(/CHARACTER/, $scope.loadedCharacter.name)
            };

            $scope.availableActions = [
                characterSheetMenuOptions.backtoselect
            ];

            $scope.tells = [];
            for (var i = 0; i < $scope.availableActions.length; i++) {
                $scope.tells.push(hotkeyAction($scope.availableActions[i]));
            }
        }
    ]);
