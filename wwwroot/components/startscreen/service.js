/* global angular */
angular
    .module('triskelion.startscreen.service', [])
    .service('startScreenMenuOptions',
        function () {
            'use strict';
            var startScreenMenuOptions = {
                newgame: {
                    name: 'New Game',
                    hotkey: 'N',
                    _self: 'newgame'
                },
                continuegame: {
                    name: 'Continue Game',
                    hotkey: 'C',
                    _self: 'continuegame'
                },
                savegame: {
                    name: 'Save Game',
                    hotkey: 'S',
                    _self: 'savegame'
                }
            };

            return startScreenMenuOptions;
        }
    );
