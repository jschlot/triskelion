/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher', 'startScreenMenuOptions',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher, startScreenMenuOptions) {
            'use strict';

            /*
                Developer's Note:
                This is, by far, the simplest of controller modules
                It also happens to be a good starting point for creating new modules
                One principal shown here is using functional programming to dispatch events
                with our actionDispatch service
            */

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
                    userData.currentMap.level = actionSelected.defaultLevel;
                    userData.currentMap.direction = actionSelected.defaultCompassDirection;
                    userData.currentMap.coordinates = actionSelected.startingCoordinates;

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
