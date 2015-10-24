/* global angular */
angular
    .module('triskelion.combatScreen.service', [])
    .service('combatScreenMenuOptions',
        function () {
            'use strict';
            var combatScreenMenuOptions = {
                next: {
                    name: 'Next',
                    hotkey: 'N',
                    _self: 'next'
                }
            };

            return combatScreenMenuOptions;
        }
    );
