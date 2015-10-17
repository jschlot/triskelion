/* global angular */
angular
    .module('triskelion.utils.dungeon.service', [])
    .service('gameModules',
        function() {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapRows: 12, // offset by 1
                    mapCols: 11, // offset by 1
                    defaultCompassDirection: 'west',
                    startingCoordinates: [4,4], // [ X, Y ]
                    map: [
                        {
                            name: "The Catacombs",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

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