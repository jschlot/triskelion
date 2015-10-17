angular
    .module('triskelion.partySelect.controller',[])
    .controller('partySelectController', [
        '$scope', '$location', 'partySelectActions', 'infoText', 'userData', 'playerDB', 'partyData', 'tellsList', 'objectFindByKey',
        function($scope, $location, partySelectActions, infoText, userData, playerDB, partyData, tellsList, objectFindByKey) {
            'use strict';

            if (!userData.gameModuleSelected) {
                $location.path( "/startscreen" );
                return;
            }

            tellsList.push(infoText.actionchoice.replace(/STRING/, userData.gameModuleSelected.name));

            $scope.map = {
                zone: {
                    name: infoText.partyselect
                }
            };

            /*
                TO-DO: Use actionDispatcher service to run these commands
                get more organized with the methods provided
                also, might want to break out character data into it's own layout screen


                TO-DO: Change how we work with the partyData and playerData tables
                cast should be able to know where we are at in the current state of things
                for example, if we go to playerselect at the CAMP, then cast should know who
                is in the group and who is not in the group
                Right now, partyData is the list of party members
                and cast is a bit confusing. I think it was meant to be the playerDB - the partyData
                but instead it has a mixed purpose.
            */

            $scope.cast = playerDB[userData.gameModuleSelected._self];
            var currentPick = {};

            var subaction = null;

            var switchBoard = {
                'add': function() {
                    angular.copy($scope.cast, $scope.availableActions);
                    $scope.availableActions.push(partySelectActions.back);
                    tellsList = [infoText.whowilljoin];
                    subaction = 'add';
                 },
                'remove': function() {
                    tellsList = [infoText.removePlayer];
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
                    var lookup = objectFindByKey($scope.cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        var index = $scope.cast.indexOf(lookup);
                        if (index > -1) {
                            $scope.cast.splice(index,1);
                        }
                    }

                    if (partyData.length < userData.gameModuleSelected.maxparty) {
                        tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
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

                    tellsList = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                    $scope.cast.push(currentPick);
                    $scope.partyData = partyData;

                    if (!partyData.length) {
                        switchBoard.mainactions();
                    }
                }
            };

            switchBoard.mainactions();
            $scope.tells = tellsList;


            $scope.saveAndNext = function(value) {
                if (switchBoard[value._self]) {
                    switchBoard[value._self]();
                } else {
                    switchBoard.subaction(value);
                }
                $scope.tells = tellsList;
            };
        }
    ]);
