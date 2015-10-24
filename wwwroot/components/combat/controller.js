/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyData', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList',
        function ($scope, $location, accessControl, userData, partyData, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList) {

            'use strict';

            var check = accessControl.check('combat', userData.gameMode, partyData.length)();
            if (!check) {
                //$location.path('/gamegrid');
                //return;
            }

            $scope.page = {
                name: infoText.combatscreen
            };

            $scope.availableActions = [
            ];

            $scope.tells = tellsList;
            $scope.partyData = partyData;

        }
    ]);
