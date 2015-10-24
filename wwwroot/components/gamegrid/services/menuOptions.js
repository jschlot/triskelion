/* global angular */
angular
    .module('triskelion.gamegrid.menuOptions.service', [])
    .service('gameGridMenuOptions',
        function () {
            'use strict';
            var menuOptions = {
                forward: {
                    name: 'WForward',
                    hotkey: 'W',
                    _self: 'forward'
                },
                goleft: {
                    name: 'ALeft',
                    hotkey: 'A',
                    _self: 'left'
                },
                goright: {
                    name: 'DRight',
                    hotkey: 'D',
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
