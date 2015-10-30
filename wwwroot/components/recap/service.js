/* global angular */
angular
    .module('triskelion.recapscreen.service', [])
    .service('recapScreenMenuOptions',
        function () {
            'use strict';
            var recapScreenMenuOptions = {
                playagain: {
                    name: 'Play Again',
                    hotkey: 'P',
                    _self: 'playagain'
                }
            };

            return recapScreenMenuOptions;
        }
    );
