angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
        '$scope', '$location', 'partyActions', 'infoText', 'userData', 'playerDB', 'partyData', 'objectFindByKey',
        function($scope, $location, partyActions, infoText, userData, playerDB, partyData, objectFindByKey) {
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

            var switchBoard = {
                'add': function() {
                    angular.copy($scope.cast, $scope.availableActions);
                    $scope.availableActions.push(partyActions.back);
                    $scope.tells = [infoText.whowilljoin];
                 },
                'remove': function() {
                    $scope.tells = [infoText.removePlayer];
                 },
                 'start': function() {
                    $location.path( "/crawler" );
                    return;
                 },
                 'mainactions': function() {
                    $scope.availableActions = [
                        partyActions.add,
                        partyActions.remove,
                        partyActions.start
                    ];
                 },
                 'partyfullactions': function() {
                    $scope.availableActions = [
                        partyActions.remove,
                        partyActions.start
                    ];
                 },
                 'select': function(value) {
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

                    $scope.tells = [
                        infoText.keys.name.replace(/VALUE/, value.name),
                        infoText.keys.class.replace(/VALUE/, value.type),
                        infoText.keys.health.replace(/VALUE/, value.health)
                    ];
                    $scope.availableActions = [
                        partyActions.confirmAdd,
                        partyActions.backtoselect
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
                        switchBoard.partyfullactions();
                    }
                 }
            };

            switchBoard.mainactions();

            $scope.saveAndNext = function(value) {
                if (switchBoard[value._self]) {
                    switchBoard[value._self]();
                } else {
                    switchBoard.select(value);
                }
            };
        }
    ]);
