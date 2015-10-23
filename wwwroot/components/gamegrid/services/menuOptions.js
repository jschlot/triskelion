/* global angular */
angular
    .module('triskelion.gamegrid.menuOptions.service', [])
    .service('gameGridMenuOptions',
        function () {
            'use strict';
            var menuOptions = {
                forward: {
                    name: 'Forward',
                    hotkey: 'F',
                    _self: 'forward'
                },
                goleft: {
                    name: 'Left',
                    hotkey: 'L',
                    _self: 'left'
                },
                goright: {
                    name: 'Right',
                    hotkey: 'R',
                    _self: 'right'
                },
                camp: {
                    name: 'Camp',
                    hotkey: 'C',
                    _self: 'camp'
                },
                look: {
                    name: 'Look',
                    hotkey: 'L',
                    _self: 'look'
                },
                map: {
                    name: 'Map',
                    hotkey: 'M',
                    _self: 'map'
                }
            };

            return menuOptions;
        }
    );
