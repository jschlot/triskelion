/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'mobDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList',
        function ($scope, $location, accessControl, userData, partyDB, mobDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList) {

            'use strict';

            var check = accessControl.check('combat')();
            if (!check) {
                $location.path('/gamegrid');
                return;
            }

            var tileOffset = userData.cursor.tile - 32,
                tileAction = userData.gameModuleSelected.tileActions[tileOffset];

            mobDB.add(tileAction.mobMembers);

            $scope.page = {
                name: infoText.combatscreen
            };

            $scope.availableActions = [
            ];

            $scope.tells = tellsList;
            $scope.partyData = partyDB.members;
            $scope.mobData = mobDB.members;

            $scope.tells = [tileAction.description];

        }
    ]);
