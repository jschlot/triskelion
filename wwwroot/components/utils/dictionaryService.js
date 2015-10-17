angular
    .module('triskelion.utils.dictionary.service', [])
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
                auraDamage: "PLAYER takes DAMAGE points of damage from AURA",
                partyselect: "Party Select",
                removePlayer: "Who will you ask to leave the party?",
                whowilljoin: "Who will you add to the party?",
                whowillleave: "Who will you remove to the party?",
                closeminimap: "type M again to return to maze view",
                campingislovely: "Your team kicks it's collective shoes off, leans back, and smokes the halfling leaf for 2 turns...",
                deathNote: "PLAYER dies",
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
    .factory('abilityText',
        function() {
            'use strict';
            var abilityText = {
                auraDamage: "PLAYER takes DAMAGE points of damage from AURA",
                deathNote: "PLAYER dies",
            };

            return abilityText;
        }
    )    .factory('sarcasticQuips',
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