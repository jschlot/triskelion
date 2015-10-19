/* global angular */
angular
    .module('triskelion.mapscreen.menuOptions.service', [])
    .service('menuOptions',
        function() {
            'use strict';
            var partyActions = {
                returntogame: {
                    name: "Return to Game",
                    hotkey: "R",
                    _self: "returntogame"
                },
                teleport: {
                    name: "Teleport to Entrance",
                    hotkey: "T",
                    _self: "teleport"
                }
            };

            return partyActions;
        }
    );