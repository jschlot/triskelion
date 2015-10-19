/* global angular */
angular
    .module('triskelion.utils.globalData.service', [
        'triskelion.character.factory', 'triskelion.character.service'
    ])
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
    ])
    .service('playerDB',['Character', 'ability', 'race', 'classType',
        function(Character, ability, race, classType) {
            'use strict';
            var playerDB = {};
            playerDB.dungeon = [];
            
            var devonellah = new Character("Devonellah");
                devonellah.character.abilities.small = ability.quickheal;
                        
            playerDB.dungeon.push(devonellah);
            
            return playerDB;
        }]
    );
    