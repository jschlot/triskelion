angular
    .module('triskelion.gameGrid.controller',[
        'triskelion.levelMap.service',
        'triskelion.mazeRunner.service'
    ])
    .controller('gameGridController', ['$scope', '$location',
            'userData', 'partyData', 'levelMap', 'mazeRunner', 'partyActions', 'ouchHappened', 'infoText',
            'tileService', 'miniMap', 'tellsList', 'mapModal',
        function($scope, $location,
            userData, partyData, levelMap, mazeRunner, partyActions, ouchHappened, infoText,
            tileService, miniMap, tellsList, mapModal) {
            'use strict';

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            $scope.tells = tellsList;
            $scope.auras = []; // is this right? maybe we don't want to always reset auras???
            $scope.showMiniMap = false; // should probably move minimap to it's own screen layout

            $scope.availableActions = [
                partyActions.forward,
                partyActions.goleft,
                partyActions.goright,
                partyActions.camp,
                partyActions.describe,
                partyActions.map
            ];

            $scope.partyData = partyData;

            var currentLevelMap = userData.gameModuleSelected.map[0]; // this feels hackish - current level should not be manually set to 1st level

            $scope.coordinates = userData.gameModuleSelected.startingCoordinates; // maybe this should be private
            $scope.compassDirection = userData.gameModuleSelected.defaultCompassDirection; // maybe this should be private

            levelMap.setDimensions(userData.gameModuleSelected.mapMaxX, userData.gameModuleSelected.mapMaxY); // naming is awkward
            levelMap.init(currentLevelMap.layout);

            var updateMazeRunner = function() {
                $scope.view = levelMap.getView($scope.coordinates[0],$scope.coordinates[1], $scope.compassDirection);

                mazeRunner($scope.view);

                $scope.map = {
                    zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                    location: {
                        coordinates: { x: $scope.coordinates[0], y: $scope.coordinates[1] },
                        compass: $scope.compassDirection
                    },
                    data: levelMap.getMap()
                };
            };

            /*
                TO-DO: Use actionDispatcher service to run these commands
                get more organized with the methods provided

            */

            $scope.saveAndNext = function(value) {
                var compassOptions = ['north','east', 'south', 'west'];
                var currentCompassIndex;
                tellsList.length = 0;

                switch (value._self) {
                    case 'forward':
                        var ouch = false;
                        var next = $scope.view[3][1]; // this is the next forward tile it's also kind of awkward
                        if (tileService.canGoForward(next)) {
                            switch($scope.compassDirection) {
                                case "east":
                                    $scope.coordinates[0] = $scope.coordinates[0] + 1;
                                    break;
                                case "west":
                                    $scope.coordinates[0] = $scope.coordinates[0] - 1;
                                    break;
                                case "north":
                                    $scope.coordinates[1] = $scope.coordinates[1] - 1;
                                    break;
                                case "south":
                                    $scope.coordinates[1] = $scope.coordinates[1] + 1;
                                    break;
                            }
                        } else {
                            ouch = ouchHappened();
                        }
                        break;
                    case 'left':
                        currentCompassIndex = compassOptions.indexOf($scope.compassDirection);
                        currentCompassIndex--;
                        if (currentCompassIndex < 0) {
                            currentCompassIndex = compassOptions.length-1;
                        }
                        $scope.compassDirection = compassOptions[currentCompassIndex];
                        break;
                    case 'right':
                        currentCompassIndex = compassOptions.indexOf($scope.compassDirection);
                        currentCompassIndex++;
                        if (currentCompassIndex === compassOptions.length) {
                            currentCompassIndex = 0;
                        }
                        $scope.compassDirection = compassOptions[currentCompassIndex];
                        break;
                    case 'camp':
                            tellsList.push(infoText.campingislovely);
                            $scope.tells = tellsList;
                        break;
                    case 'describe':
                            //// describe gets any metadata abount the current cell
                            $location.path( "/partyselect" );
                        break;
                    case 'map':
                        $scope.showMiniMap = ($scope.showMiniMap) ? false : true;
                        if ($scope.showMiniMap) {
                            miniMap(levelMap.getMap());
                            tellsList.push(infoText.closeminimap);
                            $scope.tells = tellsList;
                            return;
                        }
                        break;
                }

                if (tellsList) {
                    $scope.tells = tellsList;
                }

                updateMazeRunner();

                if (ouch) {
                    mapModal(ouch);
                }

            };

            updateMazeRunner();
        }
    ]);
