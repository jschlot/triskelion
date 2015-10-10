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
    .factory('partyData', [
        function() {
            'use strict';
            var partyData = [];
            return partyData;
        }
    ]);
