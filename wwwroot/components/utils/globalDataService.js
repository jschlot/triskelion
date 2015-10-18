/* global angular */
angular
    .module('triskelion.utils.globalData.service', [])
    .service('userData', ['gameModules',
        function(gameModules) {
            'use strict';
            var userData = {
                gameModuleSelected: gameModules.dungeon,
                currentMap: {
                    level: 0,
                    direction: "west",
                    coordinates: [4,4]
                }
            };
            return userData;
        }
    ])
    .service('partyData', ['playerDB', 'userData',
        function(playerDB, userData) {
            'use strict';
            var partyData = playerDB[userData.gameModuleSelected._self].slice(0,2);
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
