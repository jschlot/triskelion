angular
    .module('barricade.globalData.service', [])
    .factory('userData', [
        function() {
            'use strict';
            var userData = {
                gameModuleSelected: null
            };
            return userData;
        }
    ]);
