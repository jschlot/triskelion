/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'startScreenMenuOptions', 'objectFindByKey',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        startScreenMenuOptions, objectFindByKey) {

            'use strict';

            tellsList = [];

            var actionsList = {
                newgame: function (actionSelected) {
                    $scope.tells = [infoText.choosemodule];
                    $scope.availableActions = [
                        gameModules.dungeon
                    ];
                },
                createNewGame: function (actionSelected) {
                    userData.gameModuleSelected = actionSelected;
                    userData.gameMode = 'downtime';
                    userData.cursor.level = actionSelected.defaultLevel;
                    userData.cursor.direction = actionSelected.defaultCompassDirection;
                    userData.cursor.coordinates = actionSelected.startingCoordinates;

                    $scope.tells.length = 0;
                    $location.path('/camp');
                }
            };

            $scope.saveAndNext = function (value) {
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else {
                    actionDispatcher(actionsList.createNewGame, value);
                }
            };

            $scope.page = {
                name: infoText.startscreen
            };

            $scope.availableActions = [
                startScreenMenuOptions.newgame
            ];

            $scope.tells = tellsList;
        }
    ]);
