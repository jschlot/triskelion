/* global angular */
angular
    .module('triskelion.utils.globalData.service', ['triskelion.character.elf.factory'])
    .service('gameModules', [
        function () {
            'use strict';

            var gameModules = {
                dungeon: {
                    name: 'Dungeon of Grim Souls',
                    hotkey: 'D',
                    _self: 'dungeon',
                    maxparty: 3,
                    mapRows: 12, // offset by 1
                    mapCols: 15, // offset by 1
                    defaultCompassDirection: 'east',
                    defaultLevel: 0,
                    startingCoordinates: [2,2], // [ X, Y ]
                    map: [
                        {
                            name: 'The Catacombs',
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x20, 0x18, 0x21, 0x22, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 2

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 3

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01],  // 4

                                [0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 5

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 6

                                [0x01, 0x18, 0x23, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 7

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 8

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01],  // 9

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10

                            ]
                        }
                    ],
                    // ** ACTION TYPES ** damage, heal, buff, debuff, combat, container, conversation
                    // ** AURA TYPES ** acid, blunt, cold, fire, lightning, necrotic, piercing, poison, psychic, slashing, thunder, light
                    tileActions: [
                        {
                            description: 'A spray of lava splashes on the party!',
                            actionType: 'damage',
                            aura: 'fire',
                            save: 'agility',
                            check: 19,
                            modifier: 1,
                            success: {
                                numberOfDice: 1,
                                diceSides: 20
                            },
                            failure: null
                        },
                        {
                            description: 'A ray of light shines upon the group!',
                            actionType:  'heal',
                            aura: 'light',
                            save: null,
                            check: 0,
                            modifier: 0,
                            success: {
                                numberOfDice: 2,
                                diceSides: 8
                            },
                            failure: null
                        },
                        {
                            actionType:  'message',
                            description: 'A eerie wailing sound comes from down the hallway...'
                        },
                        {
                            actionType:  'combat',
                            description: 'Your party enters combat mode'
                        }
                    ]
                }
            };

            return gameModules;
        }
    ])
    .service('userData', [
        function () {
            'use strict';

            var userData = {
                gameModuleSelected: null,
                cursor: {},
                gameMode: 'downtime'
            };
            return userData;
        }
    ])
    .service('partyDB', ['objectFindByKey',
        function (objectFindByKey) {
            'use strict';

            var partyDB = {};
            partyDB.members = [];
            partyDB.get = function(key, value) {
                var lookup = objectFindByKey(this.members, key, value);
                return (lookup) ? lookup : false;

            };
            return partyDB;
        }
    ])
    .service('tellsList', [
        function () {
            'use strict';

            var tellsList = [];
            return tellsList;
        }
    ])
    .service('aurasList', [
        function () {
            'use strict';

            var aurasList = [];
            return aurasList;
        }
    ])
    .service('playerDB',['Priest', 'Ranger', 'Wizard', 'Scout',
        function (Priest, Ranger, Wizard, Scout) {
            'use strict';

            var playerDB = {};
            playerDB.dungeon = [
                new Priest('Devonellah'),
                new Ranger('Celadior'),
                new Wizard('Beladriel'),
                new Scout('Hedroxx')
            ];

            return playerDB;
        }]
    );
