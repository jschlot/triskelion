angular
    .module('barricade.StartScreen.controller',[])
    .controller('StartScreenController', [
        '$scope', '$location', 'objectFindByKey', 'hotkeyAction', 'actionNotFound', 'gameModules', 'infoText', 'userData',
        function($scope, $location, objectFindByKey, hotkeyAction, actionNotFound, gameModules, infoText, userData) {
            'use strict';

            $scope.tells = [];
            $scope.headerText = infoText.startscreen;

            $scope.availableActions = [
                gameModules.zombies,
                gameModules.robots
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
                    userData.gameModuleSelected = lookup._self;
                    $location.path( "/story" );
                } else {
                    $scope.tells.push(actionNotFound());
                }

                $scope.prompt = null;
            };

        }
    ]);
