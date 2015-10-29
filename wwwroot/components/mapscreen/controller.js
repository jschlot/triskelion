/* global angular */
angular
    .module('triskelion.mapScreen.controller',[
        'triskelion.mapscreen.miniMap.service', 'triskelion.mapscreen.menuOptions.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('mapScreenController', [
            '$scope', '$location', 'infoText', 'userData', 'partyDB', 'tellsList', 'mapScreenMenuOptions',
            'actionDispatcher', 'levelMap', 'miniMap', 'hotkeyAction', 'accessControl',
        function ($scope, $location, infoText, userData, partyDB, tellsList, mapScreenMenuOptions,
            actionDispatcher, levelMap, miniMap, hotkeyAction, accessControl) {
            'use strict';

            var check = accessControl.check('exploration')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            var currentLevel = userData.cursor.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.cursor.coordinates,
                menuOptions = mapScreenMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);
            miniMap(levelMap.getMap());

            $scope.saveAndNext = function (value) {
                var actionsList = {
                    returntogame: function (actionSelected) {
                        $location.path('/gamegrid');
                    },
                    teleport: function (actionSelected) {
                        userData.cursor.coordinates = userData.gameModuleSelected.startingCoordinates;
                        userData.cursor.direction = userData.gameModuleSelected.defaultCompassDirection;
                        $location.path('/gamegrid');
                    }
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.page = {
                name: infoText.mapscreen
            };

            $scope.page = {
                zone: {name: userData.gameModuleSelected.name + ': ' + currentLevelMap.name},
                location: {
                    coordinates: {x: coordinates[0], y: coordinates[1]},
                    compass: 'map'
                }
            };

            $scope.availableActions = [
                menuOptions.returntogame,
                menuOptions.teleport
            ];

            $scope.tells = tellsList;
        }
    ]);
