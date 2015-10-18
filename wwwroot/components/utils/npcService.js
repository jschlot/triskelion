/* global angular */
angular
    .module('triskelion.utils.npc.service', [])
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
    .service('playerDB',['npcabilities', 'npcraces', 'npctypes',
        function(npcabilities,npcraces,npctypes) {
            'use strict';
            var playerDB = {
                'dungeon': [
                    {
                        name: "Gregor Mandalor",
                        hotkey: "G",
                        _self: "gregor",
                        health: 200,
                        maxhealth: 200,
                        status: "Alive",
                        type: npctypes.dungeon.fighter.name,
                        race: npcraces.dungeon.human.name,
                        abilities: [
                            npcabilities.dungeon.swing,
                            npcabilities.dungeon.block,
                            npcabilities.dungeon.taunt
                        ]
                    },
                    {
                        name: "Devonellah",
                        hotkey: "D",
                        _self: "devonellah",
                        health: 80,
                        maxhealth: 80,
                        status: "Alive",
                        type: npctypes.dungeon.support.name,
                        race: npcraces.dungeon.elf.name,
                        abilities: [
                            npcabilities.dungeon.quickheal,
                            npcabilities.dungeon.bubble,
                            npcabilities.dungeon.radiate
                        ]
                    },
                    {
                        name: "Jupiterra",
                        hotkey: "J",
                        _self: "jupiterra",
                        health: 100,
                        maxhealth: 100,
                        status: "Alive",
                        type: npctypes.dungeon.archer.name,
                        race: npcraces.dungeon.elf.name,
                        abilities: [
                            npcabilities.dungeon.shoot,
                            npcabilities.dungeon.powershot,
                            npcabilities.dungeon.flurry
                        ]
                    },
                    {
                        name: "Thermofax Magipoor",
                        hotkey: "T",
                        _self: "thermofax",
                        health: 80,
                        maxhealth: 80,
                        status: "Alive",
                        type: npctypes.dungeon.caster.name,
                        race: npcraces.dungeon.human.name,
                        abilities: [
                            npcabilities.dungeon.fireball,
                            npcabilities.dungeon.dragonblast,
                            npcabilities.dungeon.inferno
                        ]
                    },
                    {
                        name: "Krayt Stoneleg",
                        hotkey: "K",
                        _self: "krayt",
                        health: 120,
                        maxhealth: 120,
                        status: "Alive",
                        type: npctypes.dungeon.thief.name,
                        race: npcraces.dungeon.dwarf.name,
                        abilities: [
                            npcabilities.dungeon.pummel,
                            npcabilities.dungeon.smash,
                            npcabilities.dungeon.whirlwind
                        ]
                    }
                ]
            };

            return playerDB;
        }]
    );
    