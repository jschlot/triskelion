/* global angular */
angular
    .module('triskelion.utils.globalData.service', ['triskelion.party.factory', 'triskelion.character.hero.factory', 'triskelion.monster.factory'])
    .service('gameModules', [
        function () {
            'use strict';

            var gameModules = {
                dungeon: {
                    name: 'Dungeon of Grim Souls',
                    hotkey: 'D',
                    _self: 'dungeon',
                    maxparty: 3,
                    mapRows: 20, // offset by 1
                    mapCols: 30, // offset by 1
                    defaultCompassDirection: 'south',
                    defaultLevel: 0,
                    startingCoordinates: [1,1], // [ X, Y ]
                    map: [
                        {
                            name: 'The Catacombs',
                            layout: [
                                // action tiles start at 0x20, 0x18 is floor, 0x1A is a door, 0xFF is the exit

                                // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0
                                [0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01],  // 2
                                [0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01],  // 3
                                [0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x26, 0x18, 0x01, 0x18, 0x27, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01],  // 4
                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x24, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x26, 0x18, 0x01, 0x18, 0x27, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 5
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 6
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x24, 0x18, 0x01, 0x18, 0x25, 0x19, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 7
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x1C, 0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01],  // 8
                                [0x01, 0x18, 0x18, 0x25, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x19, 0x29, 0x29, 0x01, 0x18, 0x01],  // 9
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 10
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01],  // 11
                                [0x01, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01],  // 12
                                [0x01, 0x01, 0x18, 0x23, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x28, 0x18, 0x01, 0x18, 0x01, 0x1C, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 13
                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 14
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x20, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x2A, 0x01, 0x01, 0x1C, 0x01],  // 15
                                [0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x20, 0x01, 0x01, 0x28, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x2A, 0x18, 0x01, 0x01, 0x18, 0x01],  // 16
                                [0x01, 0xFE, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x1B, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01],  // 17
                                [0x01, 0x18, 0x18, 0x22, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 18
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]  // 19
                            ]
                        }
                    ],
                    tileActions: [
                        {
                            description: 'A spray of lava splashes on the party!',
                            actionType: 'damage',
                            repeater: 1,
                            aura: 'fire',
                            save: 'agility',
                            modifier: 1,
                            hit: {
                                numberOfDice: 1,
                                diceSides: 4
                            },
                            miss: null
                        },
                        {
                            description: 'A ray of light shines upon the group!',
                            actionType: 'heal',
                            repeater: 2,
                            aura: 'light',
                            save: null,
                            modifier: 0,
                            hit: {
                                numberOfDice: 2,
                                diceSides: 8
                            },
                            miss: null
                        },
                        {
                            description: 'A eerie wailing sound comes from down the hallway...',
                            actionType: 'message',
                            repeater: 9999
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
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
    .service('partyDB', ['Party',
        function (Party) {
            'use strict';

            var partyDB = new Party();
            return partyDB;
        }
    ])
    .service('mobDB', ['Party', 'monsterMaker',
        function (Party, monsterMaker) {
            'use strict';

            var mobDB = new Party();

            mobDB.add = function(mob) {
                angular.forEach(mob, function (player) {
                    mobDB.members.push(monsterMaker.spawn(player));
                });
            };

            return mobDB;
        }
    ])
    .service('tellsList', [
        function () {
            'use strict';

            var tellsList = {};
            tellsList.log = [];
            return tellsList;
        }
    ])
    .service('aurasList', [
        function () {
            'use strict';

            var aurasList = {};
            aurasList.log = [];
            return aurasList;
        }
    ])
    .service('playerDB',['heroMaker',
        function (heroMaker) {
            'use strict';

            var playerDB = [];
            playerDB.push(heroMaker.spawn({name: 'Devonellah', spec: 'priest'}));
            playerDB.push(heroMaker.spawn({name: 'Corianna', spec: 'ranger'}));
            playerDB.push(heroMaker.spawn({name: 'Belanor', spec: 'wizard'}));
            playerDB.push(heroMaker.spawn({name: 'Hedroxx', spec: 'scout'}));

            return playerDB;
        }]
    );
