/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList',
        function ($scope, $location, accessControl, userData, partyDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList) {

            'use strict';

            var check = accessControl.check('combat')();
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
            $scope.partyData = partyDB.members;

        }
    ]);
