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
                    name: "Lakeland Human",
                    hotkey: "L",
                    _self: "human"
                },
                elf: {
                    name: "Wood Elf",
                    hotkey: "w",
                    _self: "elf"
                },
                dwarf: {
                    name: "Mountain Dwarf",
                    hotkey: "M",
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
                healer: {
                    name: "Healer",
                    hotkey: "H",
                    _self: "healer"
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
                    _self: "cloth",
                    modifier: 10
                },
                leather: {
                    name: "Leather Vestments",
                    hotkey: "L",
                    _self: "leather",
                    modifier: 25
                },
                plate: {
                    name: "Plate Armor",
                    hotkey: "P",
                    _self: "plate",
                    modifier: 50
                }
            };

            return armor;
        }
    )
    .service('weapon',
        function() {
            'use strict';
            var weapon = {
                staff: {
                    name: "Glowing Wooden Staff",
                    hotkey: "G",
                    _self: "staff",
                    modifier: 10
                }
            };

            return weapon;
        }
    );