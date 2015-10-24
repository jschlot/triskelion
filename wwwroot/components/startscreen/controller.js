/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'startScreenMenuOptions', 'objectFindByKey',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        startScreenMenuOptions, objectFindByKey) {

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
