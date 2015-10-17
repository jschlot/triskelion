/* global angular */
angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
            '$scope', '$location', 'partySelectActions', 'infoText', 'userData', 
            'playerDB', 'partyData', 'tellsList', 'objectFindByKey', 'actionDispatcher',
        function($scope, $location, partySelectActions, infoText, userData, 
            playerDB, partyData, tellsList, objectFindByKey, actionDispatcher) {

            'use strict';

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            var allPlayers = playerDB[userData.gameModuleSelected._self],
                currentPick = {},
                context = null,
                actionsList = {},
                cast = [];

            tellsList.push(infoText.actionchoice.replace(/STRING/, userData.gameModuleSelected.name));

            cast = allPlayers.filter( function( el ) {
                var lookup = objectFindByKey(partyData, 'hotkey', el.hotkey);
                return lookup ? false : el;
            });
            
            actionsList = {
                'add': function() {
                    tellsList = [infoText.whowilljoin];                   
                    $scope.availableActions = angular.copy(cast);
                    $scope.availableActions.push(partySelectActions.back);
                    context = 'add';
                 },
                'remove': function() {
                    tellsList = [infoText.removePlayer];
                    $scope.availableActions = angular.copy(partyData);
                    $scope.availableActions.push(partySelectActions.back);
                    context = 'remove';
                 },
                 'start': function() {
                    $location.path( "/gamegrid" );
                    return;
                 },
                 'quit': function() {
                    $location.path( "/startscreen" );
                    return;
                 },
                 'mainActions': function() {
                    if (partyData.length === userData.gameModuleSelected.maxparty) {
                        $scope.availableActions = [
                            partySelectActions.remove,
                            partySelectActions.start,
                            partySelectActions.quit
                        ];
                    } else if (partyData.length === 0) {
                        $scope.availableActions = [
                            partySelectActions.add,
                            partySelectActions.quit
                        ];
                    } else {
                        $scope.availableActions = [
                            partySelectActions.add,
                            partySelectActions.remove,
                            partySelectActions.start,
                            partySelectActions.quit
                        ];
                    }
                 },
                 'back': function() {
                    actionsList.mainActions();
                 },
                 'backtoselect': function() {
                    actionsList.add();
                 },
                 'describePlayer': function(value) {
                    var abilityList = [];
                    for (var i = 0; i < value.abilities.length; i++) {
                        abilityList.push(value.abilities[i].name);
                    }

                    tellsList = [
                        infoText.keys.name.replace(/VALUE/, value.name),
                        infoText.keys.race.replace(/VALUE/, value.race),
                        infoText.keys.type.replace(/VALUE/, value.type),
                        infoText.keys.health.replace(/VALUE/, value.health),
                        infoText.keys.abilities.replace(/VALUE/, abilityList.join(", "))
                    ];
                    $scope.availableActions = [
                        partySelectActions.confirmAdd,
                        partySelectActions.backtoselect
                    ];
                 },
                 'confirmAdd': function() {
                    var lookup = objectFindByKey(cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = cast.indexOf(lookup);
                        if (index > -1) {
                            cast.splice(index,1);
                        }                        
                    }

                    if (partyData.length < userData.gameModuleSelected.maxparty) {
                        tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                        partyData.push(currentPick);
                        $scope.partyData = partyData;
                    }
                    
                    $scope.availableActions.length = 0;
                    
                    actionsList.mainActions();
                 },
                 'confirmRemove': function() {
                    var lookup = objectFindByKey(partyData, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = partyData.indexOf(lookup);
                        if (index > -1) {
                            partyData.splice(index,1);
                            $scope.availableActions.splice(index,1);
                        }
                    }

                    tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                    cast.push(currentPick);
 
                    $scope.partyData = partyData;

                    actionsList.mainActions();
                }
            };

            $scope.saveAndNext = function(value) {
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else {
                    currentPick = {};
                    angular.copy(value, currentPick);

                    if (context === 'remove') {
                        actionsList.confirmRemove();
                    } else { 
                        actionsList.describePlayer(value);                    
                    }
                }
                $scope.tells = tellsList;
            };

            $scope.page = {
                name: infoText.partyselect
            };
            $scope.tells = tellsList;
            $scope.partyData = partyData;

            actionsList.mainActions();            
        }
    ]);
