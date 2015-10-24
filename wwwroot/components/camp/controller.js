/* global angular */
angular
    .module('triskelion.camp.controller',['triskelion.camp.service'])
    .controller('campController', [
            '$scope', '$location', '$window', 'campActions', 'infoText', 'userData',
            'playerDB', 'partyDB', 'tellsList', 'objectFindByKey', 'actionDispatcher', 'accessControl',
        function ($scope, $location, $window, campActions, infoText, userData,
            playerDB, partyDB, tellsList, objectFindByKey, actionDispatcher, accessControl) {
            'use strict';

            var check = accessControl.check('downtime')();
            if (!check) {
                $location.path('/startscreen');
                return;
            }

            var allPlayers = playerDB[userData.gameModuleSelected._self],
                currentPick = {},
                context = null,
                actionsList = {},
                cast = [];

            cast = allPlayers.filter(function (player) {
                var lookup = objectFindByKey(partyDB.members, 'hotkey', player.hotkey);
                return lookup ? false : player;
            });

            actionsList = {
                'add': function () {
                    $scope.tells = [infoText.whowilljoin];
                    $scope.availableActions = angular.copy(cast);
                    $scope.availableActions.push(campActions.back);
                    context = 'add';
                },
                'remove': function () {
                    $scope.tells = [infoText.removePlayer];
                    $scope.availableActions = angular.copy(partyDB.members);
                    $scope.availableActions.push(campActions.back);
                    context = 'remove';
                },
                'viewplayer': function (value) {
                    var lookup = partyDB.members[value - 1];
                    if (lookup) {
                        $location.path('/charactersheet/' + lookup._this);
                    }
                    return;
                },
                'enter': function () {
                    userData.gameMode = 'exploration';
                    $location.path('/gamegrid');
                    return;
                },
                'quit': function () {
                    // force a reload to completely reload state
                    $window.location.reload();
                    return;
                },
                'mainActions': function () {
                    if (partyDB.members.length === userData.gameModuleSelected.maxparty) {
                        $scope.availableActions = [
                            campActions.viewplayer,
                            campActions.remove,
                            campActions.enter,
                            campActions.quit
                        ];
                    } else if (partyDB.members.length === 0) {
                        $scope.availableActions = [
                            campActions.add,
                            campActions.quit
                        ];
                    } else {
                        $scope.availableActions = [
                            campActions.viewplayer,
                            campActions.add,
                            campActions.remove,
                            campActions.enter,
                            campActions.quit
                        ];
                    }
                },
                'back': function () {
                    actionsList.mainActions();
                },
                'backtoselect': function () {
                    actionsList.add();
                },
                'describePlayer': function (player) {
                    var abilityList = [], character = player.character;

                    angular.forEach(character.abilities, function (ability, key) {
                        if (!angular.equals({}, ability)) {
                            this.push(ability.name);
                        }
                    }, abilityList);

                    $scope.tells = [
                        infoText.describeCharacter
                            .replace(/NAME/, character.identity.name)
                            .replace(/LEVEL/, character.experience.level)
                            .replace(/RACE/, character.identity.race)
                            .replace(/SPEC/, character.identity.spec)
                    ];

                    $scope.availableActions = [
                        campActions.confirmAdd,
                        campActions.backtoselect
                    ];
                },
                'confirmAdd': function () {
                    var index, lookup = objectFindByKey(cast, 'hotkey', currentPick.hotkey);
                    if (lookup) {
                        index = cast.indexOf(lookup);
                        if (index > -1) {
                            cast.splice(index,1);
                        }
                    }

                    if (partyDB.members.length < userData.gameModuleSelected.maxparty) {
                        $scope.tells = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                        partyDB.members.push(currentPick);
                        $scope.partyData = partyDB.members;
                    }

                    $scope.availableActions.length = 0;

                    actionsList.mainActions();
                },
                'confirmRemove': function () {
                    var index, lookup = partyDB.getMember('hotkey', currentPick.hotkey);
                    if (lookup) {
                        index = partyDB.members.indexOf(lookup);
                        if (index > -1) {
                            partyDB.members.splice(index,1);
                            $scope.availableActions.splice(index,1);
                        }
                    }

                    $scope.tells = [infoText.actionchoice.replace(/STRING/, currentPick.name)];
                    cast.push(currentPick);

                    $scope.partyData = partyDB.members;

                    actionsList.mainActions();
                }
            };

            $scope.saveAndNext = function (value) {
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else if (angular.isNumber(value)) {
                    actionsList.viewplayer(value);
                } else {
                    //// TO-DO: currentPick being used like this feels bad (it's a global)
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

            $scope.partyData = partyDB.members;

            actionsList.mainActions();
        }
    ]);
