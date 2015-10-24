/* global ; */
/* global angular */
angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.gamegrid.mapModal.service', 'triskelion.gamegrid.menuOptions.service',
        'triskelion.gamegrid.mazeRunner.service', 'triskelion.utils.levelMap.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyDB', 'levelMap', 'mazeRunner', 'gameGridMenuOptions', 'ouchHappened', 'infoText',
            'tileService', 'tellsList', 'aurasList', 'mapModal', 'actionDispatcher', 'accessControl',
        function ($scope, $location,
            userData, partyDB, levelMap, mazeRunner, gameGridMenuOptions, ouchHappened, infoText,
            tileService, tellsList, aurasList, mapModal, actionDispatcher, accessControl) {
            'use strict';

            var check = accessControl.check('exploration', userData.gameMode, partyDB.members.length)();
            if (!check) {
                if (userData.gameMode === 'combat') {
                    $location.path('/combat');
                } else {
                    $location.path('/startscreen');
                }
                return;
            }

            var currentLevel = userData.cursor.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                currentCompassIndex,
                compassOptions = ['north','east', 'south', 'west'],
                coordinates = userData.cursor.coordinates,
                compassDirection = userData.cursor.direction,
                actionsList = {},
                menuOptions = gameGridMenuOptions;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            actionsList = {
                'forward': function () {
                    var nextTileIndex = $scope.view.length - 2,
                        next = $scope.view[nextTileIndex][1],
                        mode;
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
                        mode = tileService.action({_self: next, party: $scope.partyData, tells: $scope.tells});
                        if (mode !== 'exploration') {
                            userData.gameMode = mode;
                            $location.path('/' + mode);
                            return 'stop mazerunner';
                        }
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
                    userData.cursor.direction = compassDirection;
                },
                'right': function () {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex++;
                    if (currentCompassIndex === compassOptions.length) {
                        currentCompassIndex = 0;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                    userData.cursor.direction = compassDirection;
                },
                'camp': function () {
                    userData.gameMode = 'downtime';
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

                    // check to see if everyone is dead
                    if (partyDB.partyHP() < 1) {
                        $scope.availableActions = [
                            menuOptions.camp
                        ];
                        $scope.tells = [
                            infoText.alldead
                        ];
                    }
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
            $scope.partyData = partyDB.members;
            $scope.auras = aurasList; // is this right? maybe we don't want to always reset auras???

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
