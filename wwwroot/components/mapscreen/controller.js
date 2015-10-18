/* global angular */
angular
    .module('triskelion.mapScreen.controller',[])
    .controller('mapScreenController', [
            '$scope', '$location', 'infoText', 'userData', 'partyData', 'tellsList', 'partyActions', 
            'actionDispatcher', 'levelMap', 'miniMap', 'hotkeyAction',  
        function($scope, $location, infoText, userData, partyData, tellsList, partyActions, 
            actionDispatcher, levelMap, miniMap, hotkeyAction) {
            
            'use strict';

            if (!userData.gameModuleSelected || partyData.length === 0) {
                $location.path( "/startscreen" );
                return;
            }

            var currentLevel = userData.currentMap.level,
                currentLevelMap = userData.gameModuleSelected.map[currentLevel],
                coordinates = userData.currentMap.coordinates,
                startingActionTells;
                
            startingActionTells = function() {
                $scope.tells = [];
                for (var i=0; i<$scope.availableActions.length; i++) {
                    $scope.tells.push(hotkeyAction($scope.availableActions[i]));
                }
            };

            levelMap.setDimensions(userData.gameModuleSelected.mapRows, userData.gameModuleSelected.mapCols);
            levelMap.init(currentLevelMap.layout);

            miniMap(levelMap.getMap());
          
            $scope.saveAndNext = function(value) {
                var actionsList = {
                    returntogame: function(actionSelected) {
                        tellsList.length = 0;
                        $location.path( "/gamegrid" );
                    },
                    teleport: function(actionSelected) {
                        userData.currentMap.coordinates = userData.gameModuleSelected.startingCoordinates;
                        userData.currentMap.direction = userData.gameModuleSelected.defaultCompassDirection;
                        $location.path( "/gamegrid" );
                    },
                };

                actionDispatcher(actionsList[value._self], value);
            };

            $scope.page = {
                name: infoText.mapscreen
            };                      

            $scope.page = {
                zone: { name: userData.gameModuleSelected.name + ": " + currentLevelMap.name },
                location: {
                    coordinates: { x: coordinates[0], y: coordinates[1] },
                    compass: "map"
                }
            };

            $scope.availableActions = [
                partyActions.returntogame,
                partyActions.teleport
            ];
            
            $scope.tells = [];
            startingActionTells();
                        
        }
    ]);
