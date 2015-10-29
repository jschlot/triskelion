/* global angular */
angular
    .module('triskelion.characterSheet.controller',[
        'triskelion.charactersheet.service'
    ])
    .controller('characterSheetController', [
        '$scope', '$location', '$routeParams', 'infoText', 'partyDB', 'userData', 'hotkeyAction',
        'characterSheetMenuOptions', 'actionDispatcher', 'accessControl', 'tellsList',
        function ($scope, $location, $routeParams, infoText, partyDB, userData, hotkeyAction,
            characterSheetMenuOptions, actionDispatcher, accessControl, tellsList) {
            'use strict';

            var check = accessControl.check('downtime')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            // the actions list might need to know context or be dynamic
            $scope.saveAndNext = function (value) {
                var actionsList = {
                    backtoselect: function (actionSelected) {
                        $location.path('/camp');
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.loadedCharacter = partyDB.getMember("_this", $routeParams.characterkey);

            $scope.page = {
                name: infoText.charactersheet.replace(/CHARACTER/, $scope.loadedCharacter.name)
            };

            $scope.availableActions = [
                characterSheetMenuOptions.backtoselect
            ];

            $scope.tells = tellsList;
        }
    ]);
