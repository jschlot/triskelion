/* global angular */
angular
    .module('triskelion.combatScreen.service', [])
    .service('combatScreenMenuOptions',
        function () {
            'use strict';
            var combatScreenMenuOptions = {
                skip: {
                    name: 'Next',
                    hotkey: 'N',
                    _self: 'next'
                },
                fight: {
                    name: 'Fight',
                    hotkey: 'F',
                    _self: 'fight'
                },
                spell: {
                    name: 'Spell',
                    hotkey: 'S',
                    _self: 'spell'
                },
                use: {
                    name: 'Use',
                    hotkey: 'U',
                    _self: 'use'
                },
                run: {
                    name: 'Run',
                    hotkey: 'R',
                    _self: 'run'
                }
            };

            return combatScreenMenuOptions;
        }
    );
