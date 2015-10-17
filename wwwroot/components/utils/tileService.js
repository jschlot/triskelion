/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .factory('tileService',
        function() {
            'use strict';

            var tileService = {
                isBlock: function(tile) {
                    return (tile < 24) ? true : false;
                },
                canGoForward: function(tile) {
                    return (tile > 23) ? true : false;
                },
                mapClass: function(tile) {
                    var className = 'wall';
                    if (tile > 23) {
                        className = 'floor';
                    } else if (tile === 4) {
                        className = 'floor';                        
                    } else if (tile === 5) {
                        className = 'floor';                        
                    }

                    return className;
                },
                set: {
                    'NOTHING': 0x00
                }
            };
            return tileService;
        }
    );