angular
    .module('triskelion.utils.tileService.service', [])
    .factory('tileService',
        function() {
            'use strict';

            var tileService = {
                isBlock: function(tile) {
                    return (tile < 96) ? true : false;
                },
                canGoForward: function(tile) {
                    return (tile > 95) ? true : false;
                },
                mapClass: function(tile) {
                    var className = 'closed';
                    if (tile > 95) {
                        className = 'opened';
                    }

                    return className;
                },
                set: {
                    'NOTHING': 0x00
                }
            }
            return tileService;
        }
    );