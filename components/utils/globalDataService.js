angular
    .module('triskelion.utils.globalData.service', [])
    .factory('userData', [
        function() {
            'use strict';
            var userData = {
                gameModuleSelected: null
            };
            return userData;
        }
    ]);
