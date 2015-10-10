angular
    .module('triskelion.startScreen.controller',[])
    .controller('startScreenController', [
        '$scope', '$location', 'gameModules', 'infoText', 'userData',
        function($scope, $location, gameModules, infoText, userData) {
            'use strict';

            $scope.tells = [infoText.choosemodule];
            $scope.headerText = infoText.startscreen;

            $scope.availableActions = [
                gameModules.dungeon
            ];

            $scope.saveAndNext = function(value) {
                userData.gameModuleSelected = value;
                $location.path( "/partyselect" );
            };
        }
    ]);
