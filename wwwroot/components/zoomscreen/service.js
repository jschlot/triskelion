/* global angular */
angular
    .module('triskelion.zoomscreen.service', [])
    .service('zoomScreenMenuOptions',
        function () {
            'use strict';
            var zoomScreenMenuOptions = {
                update: {
                    name: 'Update',
                    hotkey: 'U',
                    _self: 'update'
                }
            };

            return zoomScreenMenuOptions;
        }
    );
