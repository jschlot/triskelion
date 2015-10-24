/* global angular */
angular
    .module('triskelion.combatScreen.controller',[])
    .controller('combatScreenController', [
        '$scope', '$location', 'accessControl', 'userData', 'partyData',
        function ($scope, $location, accessControl, userData, partyData) {

            'use strict';

            var check = accessControl.check('combat', userData.gameMode, partyData.length)();
            if (!check) {
                //$location.path('/gamegrid');
                //return;
            }



        }
    ]);
