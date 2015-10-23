/* global angular */
angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.gamegrid.mapModal.service', 'triskelion.gamegrid.menuOptions.service',
        'triskelion.gamegrid.mazeRunner.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyData', 'levelMap', 'mazeRunner', 'gameGridMenuOptions', 'ouchHappened', 'infoText',
            'tileService', 'tellsList', 'mapModal', 'actionDispatcher',
        function ($scope, $location,
            userData, partyData, levelMap, mazeRunner, gameGridMenuOptions, ouchHappened, infoText,
            tileService, tellsList, mapModal, actionDispatcher) {
            'use strict';

            if (!userData.gameModuleSelected || partyData.length === 0) {
                $location.path('/startscreen');
                return;
            }

            var currentLevel = userData.currentMap.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                currentCompassIndex,
                compassOptions = ['north','east', 'south', 'west'],
                coordinates = userData.currentMap.coordinates,
                compassDirection = userData.currentMap.direction,
                actionsList = {},
                menuOptions = gameGridMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            actionsList = {
                'forward': function () {
                    var nextTileIndex = $scope.view.length - 2,
                        next = $scope.view[nextTileIndex][1];
                    if (tileService.canGoForward(next)) {
                        switch (compassDirection) {
                            case 'east':
                                coordinates[0] = coordinates[0] + 1;
                                break;
                            case 'west':
                                coordinates[0] = coordinates[0] - 1;
                                break;
                            case 'north':
                                coordinates[1] = coordinates[1] - 1;
                                break;
                            case 'south':
                                coordinates[1] = coordinates[1] + 1;
                                break;
                        }

                        $scope.tells = [];
                        tileService.action({_self: next, party: partyData, tells: $scope.tells});
                    } else {
                        mapModal(ouchHappened());
                        return 'stop mazerunner';
                    }
                },
                'left': function () {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex--;
                    if (currentCompassIndex < 0) {
                        currentCompassIndex = compassOptions.length - 1;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                    userData.currentMap.direction = compassDirection;
                },
                'right': function () {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex++;
                    if (currentCompassIndex === compassOptions.length) {
                        currentCompassIndex = 0;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                    userData.currentMap.direction = compassDirection;
                },
                'camp': function () {
                    $location.path('/camp');
                },
                'look': function () {
                    //// describe gets any metadata abount the current cell
                },
                'map': function () {
                    $location.path('/mapscreen');
                },
                'updateMazeRunner': function () {
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

            $scope.saveAndNext = function (value) {
                $scope.tells = [];

                var returnValue = actionDispatcher(actionsList[value._self], value);
                if (returnValue !== 'stop mazerunner') {
                    actionsList.updateMazeRunner();
                }
            };

            $scope.tells = tellsList;
            $scope.partyData = partyData;
            $scope.auras = []; // is this right? maybe we don't want to always reset auras???

            $scope.availableActions = [
                menuOptions.forward,
                menuOptions.goleft,
                menuOptions.goright,
                menuOptions.camp,
                menuOptions.look,
                menuOptions.map
            ];

            actionsList.updateMazeRunner();
        }
    ]);
