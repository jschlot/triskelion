/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service','triskelion.character.hero.factory'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'startScreenMenuOptions', 'objectFindByKey', 'aurasList', 'partyDB', 'heroMaker',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        startScreenMenuOptions, objectFindByKey, aurasList, partyDB, heroMaker) {

            'use strict';

            var actionsList = {
                newgame: function (actionSelected) {
                    $scope.tells.push(infoText.choosemodule);

                    // a new game should reset userData, partyDB, aurasList
                    aurasList.log.length = 0;

                    userData.gameModuleSelected = null;
                    userData.gameMode = 'downtime';
                    userData.cursor = {};

                    partyDB.members.length = 0;

                    $scope.availableActions = [
                        gameModules.dungeon
                    ];
                },
                createNewGame: function (actionSelected) {
                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, actionSelected.name));

                    // TO-DO: should perform a deep copy or should go to factory to generate the instance.
                    // right now it's NOT an instance, it's a reference, so we don't get to replay a module

                    userData.gameModuleSelected = actionSelected;
                    userData.gameMode = 'downtime';
                    userData.cursor.level = actionSelected.defaultLevel;
                    userData.cursor.direction = actionSelected.defaultCompassDirection;
                    userData.cursor.coordinates = actionSelected.startingCoordinates;

                    $location.path('/camp');
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
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

            $scope.tells = tellsList.log;
            $scope.tells.length = 0;
        }
    ]);
