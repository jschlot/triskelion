angular
    .module('triskelion.utils.dictionary.service', [])
    .factory('gameModules',
        function() {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon"
                }
            };

            return gameModules;
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
                }
            };

            return partyActions;
        }
    )
    .factory('infoText',
        function() {
            'use strict';
            var motd = {
                startscreen: "Welcome to Triskelion.",
                actionchoice: "You chose STRING"
            };

            return motd;
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
