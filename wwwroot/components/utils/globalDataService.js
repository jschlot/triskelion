/* global angular */
angular
    .module('triskelion.utils.globalData.service', ['triskelion.character.elf.factory'])
    .service('gameModules', [
        function(tileService) {
            'use strict';

            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapRows: 12, // offset by 1
                    mapCols: 15, // offset by 1
                    defaultCompassDirection: 'east',
                    defaultLevel: 0,
                    startingCoordinates: [2,2], // [ X, Y ]
                    map: [
                        {
                            name: "The Catacombs",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x20, 0x18, 0x21, 0x22, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 2

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 3

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01],  // 4

                                [0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 5

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 6

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 7

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 8

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01],  // 9

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10

                            ]
                        }
                    ],
                    tileActions: [
                        {
                            actionType: "damage",
                            description: "A spray of lava splashes on the party!",
                            savingThrow: 15, // should not be attached to an ability, but to a player
                            numberOfDice: 1,
                            diceSides: 10
                        },
                        {
                            actionType:  "heal",
                            description: "A ray of light shines upon the group!",
                            numberOfDice: 2,
                            diceSides: 8
                        },
                        {
                            actionType:  "message",
                            description: "A eerie wailing sound comes from down the hallway...",
                            numberOfDice: 2,
                            diceSides: 8
                        }
                    ]
                }
            };

            return gameModules;
        }
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
    .service('playerDB',['Priest', 'Ranger', 'Wizard', 'Scout',
        function(Priest, Ranger, Wizard, Scout) {
            'use strict';

            var playerDB = {};
            playerDB.dungeon = [];

            var devonellah = new Priest("Devonellah");
            playerDB.dungeon.push(devonellah);

            var celadior = new Ranger("Celadior");
            playerDB.dungeon.push(celadior);

            var beladriel = new Wizard("Beladriel");
            playerDB.dungeon.push(beladriel);

            var hedroxx = new Scout("Hedroxx");
            playerDB.dungeon.push(hedroxx);

            return playerDB;
        }]
    );
