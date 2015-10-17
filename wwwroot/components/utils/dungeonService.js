angular
    .module('triskelion.utils.dungeon.service', [])
    .factory('gameModules',
        function() {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapRows: 30, // offset by 1
                    mapCols: 50, // offset by 1
                    defaultCompassDirection: 'south',
                    startingCoordinates: [2,1], // [ X, Y ]
                    map: [
                        {
                            name: "The Catacombs (lvl 1)",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x01],  // 1

                                [0x01, 0x01, 0x24, 0x01, 0x01, 0x01, 0x01, 0x01, 0x24, 0x01, 0x24, 0x01],  // 2

                                [0x01, 0x01, 0x24, 0x01, 0x01, 0x01, 0x01, 0x24, 0x24, 0x01, 0x24, 0x01],  // 3

                                [0x01, 0x01, 0x24, 0x25, 0x24, 0x24, 0x04, 0x24, 0x01, 0x01, 0x24, 0x01],  // 4

                                [0x01, 0x01, 0x26, 0x01, 0x01, 0x01, 0x01, 0x24, 0x01, 0x01, 0x05, 0x01],  // 5

                                [0x01, 0x24, 0x24, 0x24, 0x01, 0x01, 0x01, 0x24, 0x24, 0x01, 0x24, 0x01],  // 6

                                [0x01, 0x24, 0x24, 0x24, 0x01, 0x01, 0x01, 0x01, 0x24, 0x01, 0x24, 0x01],  // 7

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x24, 0x01, 0x24, 0x01],  // 8

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x24, 0x24, 0x24, 0x01],  // 9

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10

                            ]
                        }
                    ],
                    tileAction: {
                        "action_33": [
                            {
                                tell: "You feel a sense of dread up ahead"
                            }
                        ],
                        "action_50": [
                            {
                                tell: "A ray of light shines upon your group. " +
                                      "Your party is granted [ healing ] for 5 turns by [ spirit of hopefulness ]",
                                type: "BUFF", aura: "healing", turns: 5, remaining: 5, amount: 20
                            }
                        ],
                        "action_51": [
                            {
                                tell: "A spike trap explodes, sending needles flying into the air. " +
                                      " Your party will [ bleed ] for 4 turns by [ needle trap ].",
                                type: "DEBUFF", aura: "bleed", turns: 2, remaining: 2, amount: 1
                            }
                        ]
                    }
                }
            };

            return gameModules;
        }
    );