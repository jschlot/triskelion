/* global angular */
angular
    .module('triskelion.character.service', [])
    .service('ability',
        function() {
            'use strict';
            var ability = {
                heal: {
                    name: "Healing Word",
                    hotkey: "h",
                    _self: "heal",
                    actionType: "heal"
                },
                bolt: {
                    name: "Bolt of Light",
                    hotkey: "b",
                    _self: "bolt",
                    actionType: "damage"
                },
                restoration: {
                    name: "Restoration",
                    hotkey: "r",
                    _self: "restoration",
                    actionType: "heal"
                },
                prayer: {
                    name: "Prayer of Hope",
                    hotkey: "p",
                    _self: "prayer",
                    actionType: "heal"
                }
            };

            return ability;
        }
    )
    .service('race',
        function() {
            'use strict';
            var race = {
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
            };

            return race;
        }
    )
    .service('spec',
        function() {
            'use strict';
            var spec = {
                priestess: {
                    name: "Healer",
                    hotkey: "H",
                    _self: "priestess"
                },
                fighter: {
                    name: "Fighter",
                    hotkey: "F",
                    _self: "fighter"
                },
                wizard: {
                    name: "Wizard",
                    hotkey: "W",
                    _self: "wizard"
                },
                thief: {
                    name: "Thief",
                    hotkey: "T",
                    _self: "thief"
                }
            };

            return spec;
        }
    )
    .service('armor',
        function() {
            'use strict';
            var armor = {
                cloth: {
                    name: "Cloth Robes",
                    hotkey: "C",
                    _self: "cloth"
                },
                leather: {
                    name: "Leather Vestments",
                    hotkey: "L",
                    _self: "leather"
                },
                plate: {
                    name: "Plate Armor",
                    hotkey: "P",
                    _self: "plate"
                }
            };

            return armor;
        }
    );    