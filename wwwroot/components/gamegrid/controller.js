/* global angular */
angular
    .module('triskelion.gameGrid.controller',[])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened', 'infoText',
            'tileService', 'tellsList', 'mapModal', 'actionDispatcher', 'DiceService', 
        function($scope, $location,
            userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened, infoText,
            tileService, tellsList, mapModal, actionDispatcher, DiceService) {

            'use strict';

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            var currentLevel = userData.currentMapLevel,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                currentCompassIndex,
                compassOptions = ['north','east', 'south', 'west'],
                coordinates = userData.gameModuleSelected.startingCoordinates,
                compassDirection = userData.gameModuleSelected.defaultCompassDirection,
                actionsList = {};

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            actionsList = {
                'forward': function() {
                    var currentTileIndex = $scope.view.length - 2;
                    var next = $scope.view[currentTileIndex][1];
                    if (tileService.canGoForward(next)) {
                        switch(compassDirection) {
                            case "east":
                                coordinates[0] = coordinates[0] + 1;
                                break;
                            case "west":
                                coordinates[0] = coordinates[0] - 1;
                                break;
                            case "north":
                                coordinates[1] = coordinates[1] - 1;
                                break;
                            case "south":
                                coordinates[1] = coordinates[1] + 1;
                                break;
                        }
                    } else {
                        mapModal(ouchHappened());
                        return 'stop mazerunner';
                    }
                },
                'left': function() {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex--;
                    if (currentCompassIndex < 0) {
                        currentCompassIndex = compassOptions.length-1;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                },
                'right': function() {
                    currentCompassIndex = compassOptions.indexOf(compassDirection);
                    currentCompassIndex++;
                    if (currentCompassIndex === compassOptions.length) {
                        currentCompassIndex = 0;
                    }
                    compassDirection = compassOptions[currentCompassIndex];
                },
                'camp': function() {
                    tellsList = [infoText.campingislovely];
                    $scope.tells = tellsList;
                },
                'describe': function() {
                    //// describe gets any metadata abount the current cell
                },
                'map': function() {
                    $location.path( "/mapscreen" );
                },
                'updateMazeRunner': function() {
                    $scope.view = levelMap.getView(coordinates[0],coordinates[1], compassDirection);
        
                    $scope.page = {
                        zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                        location: {
                            coordinates: { x: coordinates[0], y: coordinates[1] },
                            compass: compassDirection
                        },
                        data: levelMap.getMap()
                    };
    
                    mazeRunner($scope.view);
                }                
            };

            $scope.saveAndNext = function(value) {
                tellsList.length = 0;

                var returnValue = actionDispatcher(actionsList[value._self], value);
                if (returnValue !== 'stop mazerunner') {
                    actionsList.updateMazeRunner();
                }
            };

            $scope.tells = tellsList;
            $scope.partyData = partyData;
            $scope.auras = []; // is this right? maybe we don't want to always reset auras???

            var dice = new DiceService();
            console.log(dice.roll(3,4));

            $scope.availableActions = [
                partyActions.forward,
                partyActions.goleft,
                partyActions.goright,
                partyActions.camp,
                partyActions.describe,
                partyActions.map
            ];

            actionsList.updateMazeRunner();

        }
    ]);
