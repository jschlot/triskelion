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
                    maxparty: 3
                }
            };

            return gameModules;
        }
    )
    .factory('playerDB',
        function() {
            'use strict';
            var playerDB = {
                'dungeon': [
                    {
                        name: "Gregor Mandalor",
                        hotkey: "G",
                        _self: "gregor",
                        health: 100,
                        status: "alive",
                        type: "guardian"
                    },
                    {
                        name: "Devonellah",
                        hotkey: "D",
                        _self: "devonellah",
                        health: 80,
                        status: "alive",
                        type: "healer"
                    },
                    {
                        name: "Thermofax Magipoor",
                        hotkey: "T",
                        _self: "thermofax",
                        health: 80,
                        status: "alive",
                        type: "mage"
                    },
                    {
                        name: "Krayt Manthrax",
                        hotkey: "K",
                        _self: "krayt",
                        health: 90,
                        status: "alive",
                        type: "fighter"
                    }
                ]
            };

            return playerDB;
        }
    )
    .factory('partyActions',
        function() {
            'use strict';
            var partyActions = {
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

            return partyActions;
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
                keys: {
                    name: "Name: VALUE",
                    class: "Class: VALUE",
                    health: "Health: VALUE"
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
    );
