angular
    .module('triskelion.utils.npc.service', [])
    .factory('npcabilities',
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
    .factory('npcraces',
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
    .factory('npctypes',
        function() {
            'use strict';
            var npctypes = {
                'dungeon': {
                    tank: {
                        name: "Tank",
                        hotkey: "T",
                        _self: "tank",
                    },
                    support: {
                        name: "Healer",
                        hotkey: "H",
                        _self: "support",
                    },
                    melee: {
                        name: "Fighter",
                        hotkey: "F",
                        _self: "melee",
                    },
                    caster: {
                        name: "Caster",
                        hotkey: "C",
                        _self: "caster",
                    },
                    ranged: {
                        name: "Archer",
                        hotkey: "A",
                        _self: "ranged",
                    }
                }
            };

            return npctypes;
        }
    )
    .factory('playerDB',['npcabilities', 'npcraces', 'npctypes',
        function(npcabilities,npcraces,npctypes) {
            'use strict';
            var playerDB = {
                'dungeon': [
                    {
                        name: "Gregor Mandalor",
                        hotkey: "G",
                        _self: "gregor",
                        health: 200,
                        status: "Alive",
                        type: npctypes.dungeon.tank.name,
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
                        status: "Alive",
                        type: npctypes.dungeon.ranged.name,
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
                        status: "Alive",
                        type: npctypes.dungeon.melee.name,
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