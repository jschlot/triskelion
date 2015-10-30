/* global angular */
angular
    .module('triskelion.recapScreen.controller',['triskelion.recapscreen.service'])
    .controller('recapScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'recapScreenMenuOptions',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        recapScreenMenuOptions) {

            'use strict';

            if (userData.gameMode !== 'recap') {
                $location.path('/startscreen');
            }

            var actionsList = {
                playagain: function() {
                    $location.path('/startscreen');
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                }
            };

            $scope.page = {
                name: infoText.recapscreen
            };

            $scope.availableActions = [
                recapScreenMenuOptions.playagain
            ];

            $scope.tells = tellsList.log;
            $scope.tells.length = 0;
        }
    ]);
