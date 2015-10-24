/* global angular */
angular
    .module('triskelion.utils.accessControl.service', [])
    .service('accessControl', [
        function () {
            'use strict';
            this.check = function (test, gameMode, partySize) {
                var obj = {
                    'downtime': function() {
                        return (gameMode === 'downtime') ? true : false;
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
