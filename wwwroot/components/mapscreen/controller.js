/* global angular */
angular
    .module('triskelion.mapScreen.controller',[])
    .controller('mapScreenController', [
            '$scope', '$location', 'gameModules', 'infoText', 'userData', 'partyData', 'tellsList', 'partyActions', 
            'actionDispatcher', 'levelMap', 'miniMap',
        function($scope, $location, gameModules, infoText, userData, partyData, tellsList, partyActions, 
            actionDispatcher, levelMap, miniMap) {
            
            'use strict';

            if (!userData.gameModuleSelected || partyData.length ===0) {
                $location.path( "/startscreen" );
                return;
            }

            var currentLevel = userData.currentMapLevel,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.gameModuleSelected.startingCoordinates,
                compassDirection = userData.gameModuleSelected.defaultCompassDirection;

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            miniMap(levelMap.getMap());
          
            $scope.saveAndNext = function(value) {
                var actionsList = {
                     returntogame: function(value) {
                        tellsList.length = 0;
                        $location.path( "/gamegrid" );
                    }
                };

                actionDispatcher(actionsList.returntogame, value);
            };

            $scope.page = {
                name: infoText.mapscreen
            };                      

            $scope.page = {
                zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                location: {
                    coordinates: { x: coordinates[0], y: coordinates[1] },
                    compass: compassDirection
                }
            };

            $scope.availableActions = [
                partyActions.returntogame
            ];
            
            $scope.tells = [
                "R)eturn to game"               
            ];
                        
        }
    ]);
