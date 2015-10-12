angular
    .module('triskelion.utils.dictionary.service', [])
    .factory('gameModules',
        function() {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapMaxX: 11, // offset by 1
                    mapMaxY: 12, // offset by 1
                    defaultCameraDepth: 3, // best resolution is 3
                    defaultCompassDirection: 'east',
                    startingCoordinates: [1,1],
                    map: [
                        {
                            name: "The Catacombs (lvl 1)",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0
                                [0x01, 0x11, 0x21, 0x32, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x01],  // 1
                                [0x01, 0x01, 0x11, 0x01, 0x01, 0x01, 0x01, 0x01, 0x11, 0x01, 0x11, 0x01],  // 2
                                [0x01, 0x11, 0x11, 0x11, 0x01, 0x01, 0x01, 0x11, 0x11, 0x01, 0x11, 0x01],  // 3
                                [0x01, 0x11, 0x01, 0x11, 0x11, 0x11, 0x11, 0x11, 0x01, 0x01, 0x11, 0x01],  // 4
                                [0x01, 0x11, 0x01, 0x11, 0x01, 0x01, 0x01, 0x11, 0x01, 0x01, 0x11, 0x01],  // 5
                                [0x01, 0x11, 0x11, 0x11, 0x01, 0x01, 0x01, 0x11, 0x11, 0x01, 0x11, 0x01],  // 6
                                [0x01, 0x01, 0x11, 0x01, 0x01, 0x01, 0x01, 0x01, 0x11, 0x01, 0x11, 0x01],  // 7
                                [0x01, 0x01, 0x11, 0x01, 0x01, 0x01, 0x01, 0x01, 0x11, 0x01, 0x11, 0x01],  // 8
                                [0x01, 0x01, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x01],  // 9
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10
                            ]
                        }
                    ],
                    tileAction: {
                        "action_33": [
                            { tell: "I did this thing this one time." },
                            { tell: "I did this other thing twice." }
                        ],
                        "action_50": [
                            { tell: "Your party is cursed for 3 turns.", aura: "CURSED", turns: 3 },
                            { tell: "Your party is feared for 5 turns.", aura: "FEAR", turns: 5 }
                        ]
                    }
                }
            };

            return gameModules;
        }
    )
    .factory('partyActions',
        function() {
            'use strict';
            var partyActions = {
                forward: {
                    name: "Forward",
                    hotkey: "F",
                    _self: "forward"
                },
                goleft: {
                    name: "Left",
                    hotkey: "L",
                    _self: "left"
                },
                goright: {
                    name: "Right",
                    hotkey: "R",
                    _self: "right"
                },
                camp: {
                    name: "Camp",
                    hotkey: "C",
                    _self: "camp"
                },
                describe: {
                    name: "Describe",
                    hotkey: "D",
                    _self: "describe"
                },
                map: {
                    name: "Map",
                    hotkey: "M",
                    _self: "map"
                }
            };

            return partyActions;
        }
    )
    .factory('partySelectActions',
        function() {
            'use strict';
            var partySelectActions = {
                add: {
                    name: "Add Party Member",
                    hotkey: "A",
                    _self: "add"
                },
                remove: {
                    name: "Remove Party Member",
                    hotkey: "R",
                    _self: "remove"
                },
                back: {
                    name: "Back",
                    hotkey: "B",
                    _self: "back"
                },
                backtoselect: {
                    name: "Back To Select",
                    hotkey: "B",
                    _self: "backtoselect"
                },
                confirmAdd: {
                    name: "Confirm",
                    hotkey: "C",
                    _self: "confirmAdd"
                },
                start: {
                    name: "Start Game",
                    hotkey: "S",
                    _self: "start"
                },
                quit: {
                    name: "Quit Game",
                    hotkey: "Q",
                    _self: "quit"
                }
            };

            return partySelectActions;
        }
    )
    .factory('infoText',
        function() {
            'use strict';
            var infoText = {
                startscreen: "Welcome to Triskelion.",
                choosemodule: "To begin, choose an adventure",
                actionchoice: "You chose STRING",
                partyselect: "Party Select",
                removePlayer: "Who will you ask to leave the party?",
                whowilljoin: "Who will you add to the party?",
                whowillleave: "Who will you remove to the party?",
                closeminimap: "type M again to return to maze view",
                campingislovely: "Your team kicks it's collective shoes off, leans back, and smokes the halfling leaf for 2 turns...",
                keys: {
                    name: "Name: VALUE",
                    type: "Class: VALUE",
                    health: "Health: VALUE",
                    abilities: "Abilities: VALUE",
                    race: "Race: VALUE"
                }
            };

            return infoText;
        }
    )
    .factory('sarcasticQuips',
        function() {
            'use strict';
            var sarcasticQuips = [
                "Huh? What was that?",
                "I don't get it.",
                "Whatever did you mean?",
                "Hmmm, I don't think you typed that right.",
                "I didn't recognize your request."
            ];

            return sarcasticQuips;
        }
    )
    .factory('sarcasticOuches',
        function() {
            'use strict';
            var sarcasticOuches = [
                "Ouch!",
                "Thwack!"
            ];

            return sarcasticOuches;
        }
    );
