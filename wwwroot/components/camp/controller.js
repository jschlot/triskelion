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

            var allPlayers = playerDB,
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
                    $scope.tells.push(infoText.whowilljoin);

                    $scope.availableActions = [];
                    angular.forEach(cast, function(player) {
                         $scope.availableActions.push(player);
                    });
                    $scope.availableActions.push(campActions.back);
                    context = 'add';
                },
                'remove': function () {
                    $scope.tells.push(infoText.removePlayer);

                    $scope.availableActions = [];
                    angular.forEach(partyDB.members, function(player) {
                         $scope.availableActions.push(player);
                    });
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
                    $location.path('/startscreen');
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

                    $scope.tells.push(
                        infoText.describeCharacter
                            .replace(/NAME/, character.identity.name)
                            .replace(/RACE/, character.identity.race)
                            .replace(/SPEC/, character.identity.spec)
                    );

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
                        $scope.tells.push(infoText.actionchoice.replace(/STRING/, currentPick.name));
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

                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, currentPick.name));
                    cast.push(currentPick);

                    $scope.partyData = partyDB.members;

                    actionsList.mainActions();
                }
            };

            $scope.saveAndNext = function (value) {
                $scope.tells.length = 0;
                if (actionsList[value._self]) {
                    actionDispatcher(actionsList[value._self], value);
                } else if (angular.isNumber(value)) {
                    actionsList.viewplayer(value);
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

            $scope.tells = tellsList.log;

            $scope.partyData = partyDB.members;
						$scope.partyLevel = partyDB.experience.level;

            actionsList.mainActions();
        }
    ]);
