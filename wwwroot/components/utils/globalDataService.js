/* global angular */
angular
    .module('triskelion.utils.globalData.service', [])
    .service('userData', ['gameModules',
        function(gameModules) {
            'use strict';
            var userData = {
                gameModuleSelected: null,
                currentMap: {}
            };
            return userData;
        }
    ])
    .service('partyData', ['playerDB', 'userData',
        function(playerDB, userData) {
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
