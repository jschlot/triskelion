/* global angular */
angular
    .module('triskelion.zoomScreen.controller',[
        'triskelion.gamegrid.mapModal.service',
        'triskelion.gamegrid.mazeRunner.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('zoomScreenController', [
            '$scope', '$location', 'actionDispatcher', 'infoText', 'userData', 'tellsList', 'levelMap', 'mazeRunner',
        function ($scope, $location, actionDispatcher, infoText, userData, tellsList, levelMap, mazeRunner) {
            'use strict';

            var currentLevel = userData.cursor.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.cursor.coordinates,
                compassDirection = userData.cursor.direction;
                // menuOptions = gameGridMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);


            $scope.saveAndNext = function (value) {
                    var actionsList = {
                        'update': function () {
                            $scope.view = levelMap.getView(coordinates[0],coordinates[1], compassDirection);

                            $scope.page = {
                                zone: {name: userData.gameModuleSelected.name + ': ' + currentLevelMap.name},
                                location: {
                                    coordinates: {x: coordinates[0], y: coordinates[1]},
                                    compass: compassDirection
                                },
                                data: levelMap.getMap()
                            };

                            mazeRunner($scope.view);

                        }

                    };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.page = {
                zone: {name: userData.gameModuleSelected.name + ': ' + currentLevelMap.name},
                location: {
                    coordinates: {x: coordinates[0], y: coordinates[1]},
                    compass: 'map'
                }
            };

            $scope.availableActions = [
            ];

            $scope.tells = tellsList.log;
        }
    ]);
