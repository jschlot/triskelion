/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .factory('tileService',
        function() {
            'use strict';

            var tileService = {
                isBlock: function(tile) {
                    return (tile < 18) ? true : false;
                },
                isDoor: function(tile) {
                    var isDoor;
                    if (tile === 26) {
                        isDoor = "ns-unlocked";
                    } else if (tile === 25) {
                        isDoor = "ew-unlocked";
                    } else if (tile === 5) {
                        isDoor = "ns-locked";
                    } else if (tile === 4) {
                        isDoor = "ew-locked";
                    } else if (tile === 27) {
                        isDoor = "ew-arch";
                    } else if (tile === 28) {
                        isDoor = "ns-arch";
                    }
                    return isDoor;
                },
                canGoForward: function(tile) {
                    return (tile > 23) ? true : false;
                },
                mapClass: function(tile) {
                    var mapClass = 'wall';
                    if (tile > 23) {
                        mapClass = 'floor';
                    } else if (tile === 4) {
                        mapClass = 'floor';                        
                    } else if (tile === 5) {
                        mapClass = 'floor';                        
                    }

                    return mapClass;
                },
                set: {
                    'NOTHING': 0x00
                }
            };
            return tileService;
        }
    );