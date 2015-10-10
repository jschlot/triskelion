angular
    .module('triskelion.startScreen.controller',[])
    .controller('startScreenController', [
        '$scope', '$location', 'objectFindByKey', 'hotkeyAction', 'actionNotFound', 'gameModules', 'infoText', 'userData',
        function($scope, $location, objectFindByKey, hotkeyAction, actionNotFound, gameModules, infoText, userData) {
            'use strict';

            $scope.tells = [];
            $scope.headerText = infoText.startscreen;

            $scope.availableActions = [
                gameModules.dungeon
            ];

            $scope.formatAction = hotkeyAction;

            $scope.say = function() {
                var lookup;

                $scope.tells = [];

                if ($scope.prompt.length === 1) {
                    lookup = objectFindByKey($scope.availableActions, 'hotkey', $scope.prompt);
                }

                if (lookup) {
                    $scope.tells.push(infoText.actionchoice.replace(/STRING/, lookup.name));
                    userData.gameModuleSelected = lookup;
                    $location.path( "/story" );
                } else {
                    $scope.tells.push(actionNotFound());
                }

                $scope.prompt = null;
            };

        }
    ]);
