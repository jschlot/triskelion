angular
    .module('triskelion.utils.globalData.service', [])
    .factory('userData', ['gameModules',
        function(gameModules) {
            'use strict';
            var userData = {
                gameModuleSelected: gameModules.dungeon
            };
            return userData;
        }
    ])
    .factory('partyData', ['playerDB', 'userData',
        function(playerDB, userData) {
            'use strict';
            var partyData = [playerDB[userData.gameModuleSelected._self][0]];
            return partyData;
        }
    ]);
