/* global angular */
angular
    .module('triskelion.combatScreen.controller',['triskelion.combatScreen.service'])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyDB', 'mobDB', 'infoText', 'hotkeyAction',
        'combatScreenMenuOptions', 'tellsList', 'diceService', 'actionDispatcher',
        function ($scope, $location, accessControl, userData, partyDB, mobDB, infoText, hotkeyAction,
            combatScreenMenuOptions, tellsList, diceService, actionDispatcher) {

            'use strict';

            var check = accessControl.check('combat')();
            if (!check) {
                $location.path('/gamegrid');
                return;
            }

            var tileOffset = userData.cursor.tile - 32,
                tileAction = userData.gameModuleSelected.tileActions[tileOffset],
                turnsList = [],
                currentTurn = -1,
                mobInitiative = 0,
                playerInitiative = 0;

            mobDB.add(tileAction.mobMembers);
            mobInitiative = diceService.roll(1,20);
            playerInitiative = diceService.roll(1,20);

            $scope.tells = tellsList;
            $scope.tells = [tileAction.description];

            if(mobInitiative > playerInitiative) {
                $scope.tells.push(infoText.initiativeRolled.replace(/TEAM/, 'Mobs'));
                angular.forEach(mobDB.members, function(player) {
                    turnsList.push(player);
                });
                angular.forEach(partyDB.members, function(player) {
                    turnsList.push(player);
                });
            } else {
                $scope.tells.push(infoText.initiativeRolled.replace(/TEAM/, 'Players'));
                angular.forEach(partyDB.members, function(player) {
                    turnsList.push(player);
                });
                angular.forEach(mobDB.members, function(player) {
                    turnsList.push(player);
                });
            }

            var updateTurns = function() {
                var combatant;

                currentTurn++;

                if (currentTurn === turnsList.length) {
                    currentTurn = 0;
                }

                combatant = turnsList[currentTurn];

                $scope.page = {
                    name: infoText.combatscreen,
                    turn: currentTurn,
                    who: combatant.character.identity.name
                };
            };

            $scope.saveAndNext = function (value) {
                updateTurns();
                // var actionsList = {
                //     backtoselect: function (actionSelected) {
                //         $scope.tells = [];
                //         $location.path('/camp');
                //     }
                // };

                // actionDispatcher(actionsList[value._self], value);
            };



            $scope.mobData = mobDB.members;
            $scope.availableActions = [
                combatScreenMenuOptions.next
            ];
            $scope.partyData = partyDB.members;

            updateTurns();
        }
    ]);
