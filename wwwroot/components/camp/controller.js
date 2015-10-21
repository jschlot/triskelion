/* global angular */
angular
    .module('triskelion.camp.controller',['triskelion.camp.service'])
    .controller('campController', [
            '$scope', '$location', 'campActions', 'infoText', 'userData',
            'playerDB', 'partyData', 'tellsList', 'objectFindByKey', 'actionDispatcher',
        function($scope, $location, campActions, infoText, userData,
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

            cast = allPlayers.filter( function( el ) {
                var lookup = objectFindByKey(partyData, 'hotkey', el.hotkey);
                return lookup ? false : el;
            });

            actionsList = {
                'add': function() {
                    $scope.tells = [infoText.whowilljoin];
                    $scope.availableActions = angular.copy(cast);
                    $scope.availableActions.push(campActions.back);
                    context = 'add';
                 },
                'remove': function() {
                    $scope.tells = [infoText.removePlayer];
                    $scope.availableActions = angular.copy(partyData);
                    $scope.availableActions.push(campActions.back);
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
                            campActions.inspect,
                            campActions.remove,
                            campActions.start,
                            campActions.quit
                        ];
                    } else if (partyData.length === 0) {
                        $scope.availableActions = [
                            campActions.add,
                            campActions.quit
                        ];
                    } else {
                        $scope.availableActions = [
                            campActions.add,
                            campActions.remove,
                            campActions.start,
                            campActions.quit
                        ];
                    }
                 },
                 'back': function() {
                    actionsList.mainActions();
                 },
                 'backtoselect': function() {
                    actionsList.add();
                 },
                 'describePlayer': function(player) {
                    var abilityList = [], character = player.character;

                    angular.forEach(character.abilities, function(ability, key) {
                        if (!angular.equals({}, ability)) {
                            this.push(ability.name);
                        }
                    }, abilityList);

                    $scope.tells = [
                        infoText.describeCharacter
                            .replace(/NAME/, character.identity.name)
                            .replace(/LEVEL/, character.experience.level)
                            .replace(/RACE/, character.identity.race)
                            .replace(/SPEC/, character.identity.spec),
                        infoText.keys.armor.replace(/VALUE/, character.defense.armor),
                        infoText.keys.health.replace(/VALUE/, character.stats.health),
                        infoText.keys.energy.replace(/VALUE/, character.stats.energy),
                        infoText.keys.abilities.replace(/VALUE/, abilityList.join(", "))
                    ];

                    $scope.availableActions = [
                        campActions.confirmAdd,
                        campActions.backtoselect
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
                        $scope.tells = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
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

                    $scope.tells = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
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
            };

            $scope.page = {
                name: infoText.camp
            };

            $scope.tells = tellsList;

            $scope.partyData = partyData;

            actionsList.mainActions();
        }
    ]);
