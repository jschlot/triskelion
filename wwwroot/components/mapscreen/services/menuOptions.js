/* global angular */
angular
    .module('triskelion.mapscreen.menuOptions.service', [])
    .service('mapScreenMenuOptions',
        function () {
            'use strict';
            var partyActions = {
                returntogame: {
                    name: 'Return to Game',
                    hotkey: 'R',
                    _self: 'returntogame'
                }
            };

            return partyActions;
        }
    );
