/* global angular */
angular
    .module('triskelion.utils.globalData.service', [])
    .service('userData', [
        function() {
            'use strict';
            var userData = {
                gameModuleSelected: null,
                currentMap: {}
            };
            return userData;
        }
    ])
    .service('partyData', [
        function() {
            'use strict';
            var partyData = [];
            return partyData;
        }
    ])
    .service('tellsList', [
        function() {
            'use strict';
            var tellsList = [];
            return tellsList;
        }
    ]);
