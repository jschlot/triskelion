/* global angular */
angular
    .module('triskelion.zoomScreen.controller',[
        'triskelion.gamegrid.mapModal.service', 'triskelion.zoomscreen.service',
        'triskelion.gamegrid.mazeRunner.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('zoomScreenController', [
            '$scope', '$location', '$routeParams', 'actionDispatcher', 'infoText', 'tellsList', 'levelMap', 'mazeRunner', 'gameModules', 'zoomScreenMenuOptions',
        function ($scope, $location, $routeParams, actionDispatcher, infoText, tellsList, levelMap, mazeRunner, gameModules, zoomScreenMenuOptions) {
            'use strict';

            // TO-DO: REMOVE -- THIS IS A DEBUGGER TOOL - SHOULD NOT BE ENABLED AT SHIP DATE

            var currentLevelMap = gameModules.dungeon.map[0],
                coordinates = [$routeParams.xcoord, $routeParams.ycoord],
                compassDirection = $routeParams.direction;

            levelMap.setDimensions(gameModules.dungeon.mapRows, gameModules.dungeon.mapCols);
            levelMap.init(currentLevelMap.layout);

            var actionsList = {
                'update': function () {
                    $scope.view = levelMap.getView(coordinates[0],coordinates[1], compassDirection);

                    $scope.page = {
                        zone: {name: gameModules.dungeon.name + ': ' + currentLevelMap.name},
                        location: {
                            coordinates: {x: coordinates[0], y: coordinates[1]},
                            compass: compassDirection
                        },
                        data: levelMap.getMap()
                    };

                    mazeRunner($scope.view);
                }
            };

            $scope.saveAndNext = function (value) {
                actionDispatcher(actionsList[value._self], value);
            };

            $scope.availableActions = [
                zoomScreenMenuOptions.update
            ];

            $scope.tells = tellsList.log;
            actionsList.update();
        }
    ]);
