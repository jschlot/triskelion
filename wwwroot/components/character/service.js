/* global angular */
angular
    .module('triskelion.character.service', [])
    .service('ability',
        function() {
            'use strict';
            var ability = {
                heal: {
                    name: 'Healing Word',
                    hotkey: 'h',
                    _self: 'heal',
                    actionType: 'heal'
                },
                bolt: {
                    name: 'Bolt of Light',
                    hotkey: 'b',
                    _self: 'bolt',
                    actionType: 'damage'
                },
                restoration: {
                    name: 'Restoration',
                    hotkey: 'r',
                    _self: 'restoration',
                    actionType: 'heal'
                },
                prayer: {
                    name: 'Prayer of Hope',
                    hotkey: 'p',
                    _self: 'prayer',
                    actionType: 'heal'
                },
                shoot: {
                    name: 'Shoot Arrow',
                    hotkey: 'h',
                    _self: 'shoot',
                    actionType: 'damage'
                },
                powershot: {
                    name: 'Power Shot',
                    hotkey: 'p',
                    _self: 'powershot',
                    actionType: 'damage'
                },
                flurry: {
                    name: 'Flurry',
                    hotkey: 'f',
                    _self: 'flurry',
                    actionType: 'damage'
                },
                focusedshot: {
                    name: 'Focused Shot',
                    hotkey: 'F',
                    _self: 'focusedshot',
                    actionType: 'damage'
                },
                fireball: {
                    name: 'Fireball',
                    hotkey: 'F',
                    _self: 'fireball',
                    actionType: 'damage'
                },
                inferno: {
                    name: 'Inferno',
                    hotkey: 'I',
                    _self: 'inferno',
                    actionType: 'damage'
                },
                dragonbreath: {
                    name: 'Dragon Breath',
                    hotkey: 'D',
                    _self: 'dragonbreath',
                    actionType: 'damage'
                },
                meteor: {
                    name: 'Meteor',
                    hotkey: 'M',
                    _self: 'meteor',
                    actionType: 'damage'
                },
                cheapshot: {
                    name: 'Cheap Shot',
                    hotkey: 'C',
                    _self: 'cheapshot',
                    actionType: 'damage'
                },
                stab: {
                    name: 'stab',
                    hotkey: 'S',
                    _self: 'stab',
                    actionType: 'damage'
                },
                wound: {
                    name: 'wound',
                    hotkey: 'W',
                    _self: 'wound',
                    actionType: 'damage'
                },
                bloodlet: {
                    name: 'Bloodlet',
                    hotkey: 'B',
                    _self: 'bloodlet',
                    actionType: 'damage'
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
                    name: 'Human',
                    hotkey: 'H',
                    _self: 'human'
                },
                elf: {
                    name: 'Elf',
                    hotkey: 'e',
                    _self: 'elf'
                },
                dwarf: {
                    name: 'Dwarf',
                    hotkey: 'D',
                    _self: 'dwarf'
                }
            };

            return race;
        }
    )
    .service('spec',
        function() {
            'use strict';
            var spec = {
                priest: {
                    name: 'Priest',
                    hotkey: 'P',
                    _self: 'priest',
                    classType: 'healer'
                },
                ranger: {
                    name: 'Ranger',
                    hotkey: 'R',
                    _self: 'ranger',
                    classType: 'fighter'
                },
                wizard: {
                    name: 'Wizard',
                    hotkey: 'W',
                    _self: 'wizard',
                    classType: 'caster'
                },
                scout: {
                    name: 'Scout',
                    hotkey: 'S',
                    _self: 'scout',
                    classType: 'rogue'
                },
                cleric: {
                    name: 'Priest',
                    hotkey: 'P',
                    _self: 'cleric',
                    classType: 'healer'
                },
                knight: {
                    name: 'Knight',
                    hotkey: 'K',
                    _self: 'knight',
                    classType: 'fighter'
                },
                mage: {
                    name: 'Mage',
                    hotkey: 'M',
                    _self: 'mage',
                    classType: 'caster'
                },
                thief: {
                    name: 'Thief',
                    hotkey: 'S',
                    _self: 'thief',
                    classType: 'rogue'
                },
                adept: {
                    name: 'Adept',
                    hotkey: 'A',
                    _self: 'adept',
                    classType: 'healer'
                },
                berserker: {
                    name: 'Berserker',
                    hotkey: 'B',
                    _self: 'berserker',
                    classType: 'fighter'
                },
                necromancer: {
                    name: 'Necromancer',
                    hotkey: 'N',
                    _self: 'necromancer',
                    classType: 'caster'
                },
                burglar: {
                    name: 'burglar',
                    hotkey: 'B',
                    _self: 'burglar',
                    classType: 'rogue'
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
                    name: 'Cloth Robes',
                    hotkey: 'C',
                    _self: 'cloth',
                    modifier: 10
                },
                leather: {
                    name: 'Leather Vestments',
                    hotkey: 'L',
                    _self: 'leather',
                    modifier: 25
                },
                plate: {
                    name: 'Plate Armor',
                    hotkey: 'P',
                    _self: 'plate',
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
                    name: 'Glowing Wooden Staff',
                    hotkey: 'G',
                    _self: 'staff',
                    modifier: 1
                },
                bow: {
                    name: 'Bow of Yew',
                    hotkey: 'B',
                    _self: 'bow',
                    modifier: 1
                },
                spear: {
                    name: 'Spear of Iron',
                    hotkey: 'S',
                    _self: 'spear',
                    modifier: 1
                }
            };

            return weapon;
        }
    );
