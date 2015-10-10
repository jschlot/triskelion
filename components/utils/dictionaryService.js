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
    .factory('infoText',
        function() {
            'use strict';
            var motd = {
                startscreen: "Welcome to Triskelion - an apocalypse scenario simulator. Choose a scenario below to begin the game.",
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
