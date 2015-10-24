/* global angular */
angular
    .module('triskelion.combatScreen.service', [])
    .service('combatScreenMenuOptions',
        function () {
            'use strict';
            var combatScreenMenuOptions = {
                backtoselect: {
                    name: 'Run',
                    hotkey: 'R',
                    _self: 'run'
                }
            };

            return combatScreenMenuOptions;
        }
    );
