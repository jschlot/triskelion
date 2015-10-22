/* global angular */
angular
    .module('triskelion.startscreen.service', [])
    .service('startScreenMenuOptions',
        function() {
            'use strict';
            var startScreenMenuOptions = {
                newgame: {
                    name: "Create new Game",
                    hotkey: "C",
                    _self: "newgame"
                }
            };

            return startScreenMenuOptions;
        }
    );