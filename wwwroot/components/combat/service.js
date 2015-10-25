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
                },
                choosetarget: {
                    name: '#Choose',
                    hotkey: '#',
                    _self: 'choosetarget'
                },
                choosespell: {
                    name: '#Choose',
                    hotkey: '#',
                    _self: 'choosespell'
                },
                party: {
                    name: 'Party',
                    hotkey: 'P',
                    _self: 'party'
                },
                mobs: {
                    name: 'Mobs',
                    hotkey: 'M',
                    _self: 'mobs'
                }
            };

            return combatScreenMenuOptions;
        }
    );
