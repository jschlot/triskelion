/* global angular */
angular
    .module('triskelion.character.service', [])
    .service('ability',
        function () {
            'use strict';
            var ability = {
                heal: {
                    name: 'Healing Word',
                    hotkey: 'h',
                    _self: 'heal',
                    actionType: 'heal',
                    description: '',
                    aura: 'light',
                    save: 'agility',
                    level: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 4
                    },
                    miss: null
                },
                curewounds: {
                    name: 'Cure Wounds',
                    hotkey: 'c',
                    _self: 'curewounds',
                    actionType: 'heal',
                    description: '',
                    aura: 'light',
                    save: 'agility',
                    level: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 8
                    },
                    miss: null
                },
                bolt: {
                    name: 'Bolt of Light',
                    hotkey: 'B',
                    _self: 'bolt',
                    actionType: 'damage',
                    description: '',
                    aura: 'light',
                    save: 'agility',
                    level: 2,
                    modifier: 10,
                    hit: {
                        numberOfDice: 2,
                        diceSides: 8
                    },
                    miss: null
                },
                missile: {
                    name: 'Magic Missile',
                    hotkey: 'M',
                    _self: 'missile',
                    actionType: 'damage',
                    description: '',
                    aura: 'force',
                    save: 'agility',
                    level: 1,
                    modifier: 8,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 4
                    },
                    miss: null
                },
                burninghands: {
                    name: 'Burning Hands',
                    hotkey: 'B',
                    _self: 'burninghands',
                    actionType: 'damage',
                    description: '',
                    aura: 'force',
                    save: 'agility',
                    level: 1,
                    modifier: 8,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 6
                    },
                    miss: null
                },
                aimedshot: {
                    name: 'Aimed Shot',
                    hotkey: 'A',
                    _self: 'aimedshot',
                    actionType: 'damage',
                    description: '',
                    aura: 'piercing',
                    save: 'agility',
                    level: 1,
                    modifier: 10,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 10
                    },
                    miss: null
                }
            };

            return ability;
        }
    )
    .service('race',
        function () {
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
        function () {
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
        function () {
            'use strict';
            var armor = {
                cloth: {
                    name: 'Cloth Robes',
                    hotkey: 'C',
                    _self: 'cloth',
                    rating: 10
                },
                leather: {
                    name: 'Leather Vestments',
                    hotkey: 'L',
                    _self: 'leather',
                    rating: 15
                },
                plate: {
                    name: 'Plate Armor',
                    hotkey: 'P',
                    _self: 'plate',
                    rating: 18
                }
            };

            return armor;
        }
    )
    .service('weapon',
        function () {
            'use strict';
            var weapon = {
                staff: {
                    name: 'Glowing Wooden Staff',
                    hotkey: 'G',
                    _self: 'staff',
                    aura: 'blunt',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 6
                    },
                    miss: null
                },
                bow: {
                    name: 'Bow of Yew',
                    hotkey: 'B',
                    _self: 'bow',
                    aura: 'piercing',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 8
                    },
                    miss: null
                },
                wand: {
                    name: 'Wand of the Storm',
                    hotkey: 'W',
                    _self: 'wand',
                    aura: 'lightning',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 4
                    },
                    miss: null
                },
                spear: {
                    name: 'Spear of Iron',
                    hotkey: 'S',
                    _self: 'spear',
                    aura: 'piercing',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 6
                    },
                    miss: null
                }
            };

            return weapon;
        }
    );
