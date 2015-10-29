/* global angular */
angular
    .module('triskelion.startScreen.controller',['triskelion.startscreen.service'])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData', 'tellsList', 'actionDispatcher',
        'startScreenMenuOptions', 'objectFindByKey', 'aurasList', 'partyDB',
        function ($scope, $location, gameModules, infoText, userData, tellsList, actionDispatcher,
        startScreenMenuOptions, objectFindByKey, aurasList, partyDB) {

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
                savegame: function() {
                    localStorage.setItem('userData', JSON.stringify(userData));
                    localStorage.setItem('partyDB', JSON.stringify(partyDB));
                    localStorage.setItem('aurasList', JSON.stringify(aurasList));

                    $scope.tells.push(infoText.gavesaved);
                },
                continuegame: function () {
                    var loadedUserData = JSON.parse(localStorage.getItem('userData'));
                    var loadedPartyDB = JSON.parse(localStorage.getItem('partyDB'));
                    var loadedAurasList = JSON.parse(localStorage.getItem('aurasList'));

                    userData.gameModuleSelected = loadedUserData.gameModuleSelected;
                    userData.gameMode = 'downtime';
                    userData.cursor.level = loadedUserData.cursor.level;
                    userData.cursor.direction = loadedUserData.cursor.direction;
                    userData.cursor.coordinates = loadedUserData.cursor.coordinates;

                    partyDB.members = loadedPartyDB.members;
                    aurasList.log = loadedAurasList.log;

                    userData.gameMode = 'downtime';
                    $location.path('/camp');
                },
                createNewGame: function (actionSelected) {
                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, actionSelected.name));

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
                startScreenMenuOptions.newgame,
                startScreenMenuOptions.continuegame,
                startScreenMenuOptions.savegame
            ];

            $scope.tells = tellsList.log;
            $scope.tells.length = 0;
        }
    ]);
