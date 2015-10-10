angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
        '$scope', '$location', 'partySelectActions', 'infoText', 'userData', 'playerDB', 'partyData', 'objectFindByKey',
        function($scope, $location, partySelectActions, infoText, userData, playerDB, partyData, objectFindByKey) {
            'use strict';

            $scope.tells = [];

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            $scope.tells = [infoText.actionchoice.replace(/STRING/, userData.gameModuleSelected.name)];
            $scope.map = {
                zone: {
                    name: infoText.partyselect
                }
            };

            $scope.cast = playerDB[userData.gameModuleSelected._self];
            var currentPick = {};

            var subaction = null;

            var switchBoard = {
                'add': function() {
                    angular.copy($scope.cast, $scope.availableActions);
                    $scope.availableActions.push(partySelectActions.back);
                    $scope.tells = [infoText.whowilljoin];
                    subaction = 'add';
                 },
                'remove': function() {
                    $scope.tells = [infoText.removePlayer];
                    angular.copy(partyData, $scope.availableActions);
                    $scope.availableActions.push(partySelectActions.back);
                    subaction = 'remove';
                 },
                 'start': function() {
                    $location.path( "/crawler" );
                    return;
                 },
                 'quit': function() {
                    $location.path( "/startscreen" );
                    return;
                 },
                 'mainactions': function() {
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
                 'subaction': function(value) {
                    if (value._self === 'back') {
                        switchBoard.mainactions();
                        return;
                    }

                    if (value._self === 'backtoselect') {
                        switchBoard.add();
                        return;
                    }

                    currentPick = {};
                    angular.copy(value, currentPick);

                    if (subaction === 'remove') {
                        switchBoard.confirmRemove();
                        return;
                    }

                    var abilityList = [];
                    for (var i = 0; i< value.abilities.length; i++) {
                        abilityList.push(value.abilities[i].name);
                    }

                    $scope.tells = [
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
                    var lookup = objectFindByKey($scope.cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = $scope.cast.indexOf(lookup);
                        if (index > -1) {
                            $scope.cast.splice(index,1);
                        }
                    }

                    if (partyData.length < userData.gameModuleSelected.maxparty) {
                        $scope.tells = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                        partyData.push(currentPick);
                        $scope.partyData = partyData;
                    }
                    if (partyData.length < userData.gameModuleSelected.maxparty) {
                        switchBoard.add();
                    } else {
                        switchBoard.mainactions();
                    }
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
                    $scope.cast.push(currentPick);
                    $scope.partyData = partyData;

                    if (!partyData.length) {
                        switchBoard.mainactions();
                    }
                }
            };

            switchBoard.mainactions();

            $scope.saveAndNext = function(value) {
                if (switchBoard[value._self]) {
                    switchBoard[value._self]();
                } else {
                    switchBoard.subaction(value);
                }
            };
        }
    ]);
