/* global angular */
angular
    .module('triskelion.gameGrid.service', [])
    .service('partyActions',
        function() {
            'use strict';
            var partyActions = {
                forward: {
                    name: "Forward",
                    hotkey: "F",
                    _self: "forward"
                },
                goleft: {
                    name: "Left",
                    hotkey: "L",
                    _self: "left"
                },
                goright: {
                    name: "Right",
                    hotkey: "R",
                    _self: "right"
                },
                camp: {
                    name: "Camp",
                    hotkey: "C",
                    _self: "camp"
                },
                describe: {
                    name: "Describe",
                    hotkey: "D",
                    _self: "describe"
                },
                map: {
                    name: "Map",
                    hotkey: "M",
                    _self: "map"
                },
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