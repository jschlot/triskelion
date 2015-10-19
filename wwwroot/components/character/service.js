/* global angular */
angular
    .module('triskelion.character.service', ['triskelion.character.factory'])
    .service('npcabilities',
        function() {
            'use strict';
            var npcabilities = {
                'dungeon': {
                    swing: {
                        name: "Swing",
                        hotkey: "S",
                        description: "",
                        _self: "swing"
                    },
                    block: {
                        name: "Block Attack",
                        hotkey: "B",
                        description: "",
                        _self: "block"
                    },
                    taunt: {
                        name: "Taunt Enemies",
                        hotkey: "T",
                        description: "",
                        _self: "taunt"
                    },
                    fireball: {
                        name: "Fireball Volley",
                        hotkey: "F",
                        description: "",
                        _self: "fireball"
                    },
                    dragonblast: {
                        name: "Dragon Blast",
                        hotkey: "D",
                        description: "",
                        _self: "dragonblast"
                    },
                    inferno: {
                        name: "Inferno Strike",
                        hotkey: "I",
                        description: "",
                        _self: "inferno"
                    },
                    quickheal: {
                        name: "Quick Heal",
                        hotkey: "q",
                        description: "",
                        _self: "quickheal"
                    },
                    bubble: {
                        name: "Bubble Shield",
                        hotkey: "B",
                        description: "",
                        _self: "bubble"
                    },
                    radiate: {
                        name: "Radiate Livelihood",
                        hotkey: "R",
                        description: "",
                        _self: "radiate"
                    },
                    shoot: {
                        name: "Shoot Arrow",
                        hotkey: "S",
                        description: "",
                        _self: "shoot"
                    },
                    powershot: {
                        name: "Power Shot",
                        hotkey: "P",
                        description: "",
                        _self: "powershot"
                    },
                    flurry: {
                        name: "Furry of Arrows",
                        hotkey: "F",
                        description: "",
                        _self: "flurry"
                    },
                    pummel: {
                        name: "Pummel",
                        hotkey: "p",
                        description: "",
                        _self: "pummel"
                    },
                    whirlwind: {
                        name: "Whirlwind",
                        hotkey: "w",
                        description: "",
                        _self: "whirlwind"
                    },
                    smash: {
                        name: "Smashing Blow",
                        hotkey: "s",
                        description: "",
                        _self: "smash"
                    }
                }
            };

            return npcabilities;
        }
    )
    .service('npcraces',
        function() {
            'use strict';
            var npcraces = {
                'dungeon': {
                    human: {
                        name: "Human",
                        hotkey: "H",
                        _self: "human"
                    },
                    elf: {
                        name: "Elf",
                        hotkey: "e",
                        _self: "elf"
                    },
                    dwarf: {
                        name: "Dwarf",
                        hotkey: "D",
                        _self: "dwarf"
                    }
                }
            };

            return npcraces;
        }
    )
    .service('npctypes',
        function() {
            'use strict';
            var npctypes = {
                'dungeon': {
                    support: {
                        name: "Healer",
                        hotkey: "H",
                        _self: "support"
                    },
                    fighter: {
                        name: "Fighter",
                        hotkey: "F",
                        _self: "fighter"
                    },
                    caster: {
                        name: "Mage",
                        hotkey: "M",
                        _self: "caster"
                    },
                    thief: {
                        name: "Thief",
                        hotkey: "T",
                        _self: "thief"
                    },
                    archer: {
                        name: "Ranger",
                        hotkey: "R",
                        _self: "archer"
                    }
                }
            };

            return npctypes;
        }
    )
    .service('playerDB',['Character', 'npcabilities', 'npcraces', 'npctypes',
        function(Character, npcabilities,npcraces,npctypes) {
            'use strict';
            var playerDB = {};
            playerDB.dungeon = [];
            
            var devonellah = new Character("Devonellah");
            devonellah.character.abilities.small = { name: "flash heal" };
                        
            playerDB.dungeon.push(devonellah);
            

            return playerDB;
        }]
    );
    