/* global angular */
angular
    .module('triskelion.utils.accessControl.service', [])
    .service('accessControl', ['userData', 'partyDB',
        function (userData, partyDB) {

            'use strict';

            // userData.gameMode, partyDB.members.length, userData.gameModuleSelected
            this.check = function (test) {
                var obj,
                    gameMode = userData.gameMode,
                    partySize = partyDB.members.length,
                    gameModuleSelected = userData.gameModuleSelected;

                obj = {
                    'downtime': function() {
                        return (gameMode === 'downtime' && gameModuleSelected) ? true : false;
                    },
                    'exploration': function() {
                        return (gameMode === 'exploration' && partySize) ? true : false;
                    },
                    'combat': function() {
                        return (gameMode === 'combat' && partySize) ? true : false;
                    },
                    'social': function() {
                        return (gameMode === 'social' && partySize) ? true : false;
                    }
                };

                return obj[test];
            };
        }
    ]);
