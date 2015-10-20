/* global angular */
angular
    .module('triskelion.character.factory', ['triskelion.character.service'])
    .factory('Character', ['ability', 'race', 'spec',
        function(ability, race, spec) {
            'use strict';

            return function(name) {
                this.name = (name) ? name : 'Grunt';
                this.created = new Date();
                this.hotkey = this.name.substr(0,1);
                this._this = this.name.toLowerCase();
                
                this.character = {};

                this.character.identity = {};
				this.character.identity.name = this.name;
                this.character.identity.race = race.human.name;
                this.character.identity.spec = spec.fighter.name;

                this.character.alignment = {};
                this.character.alignment.morals = 0;
                this.character.alignment.ethics = 0;

                this.character.experience = {};
                this.character.experience.level = 1;
                this.character.experience.points = 0;
                this.character.experience.bonus = 1;
                this.character.experience.add = function(xp) {
                    var earned = xp + (xp * this.bonus);
                    this.points = this.points + earned;
                    this.level = Math.floor(this.points / 1000) + 1;
                    return earned;
                };
                
                this.character.stats = {};
                this.character.stats.health = 1;
                this.character.stats.maxhealth = 1;
                this.character.stats.energy = 0;
                this.character.stats.maxenergy = 1;
                this.character.stats.strength = 1;
                this.character.stats.agility = 1;
                this.character.stats.intelligence = 1;
                this.character.stats.wisdom = 1;
                this.character.stats.stamina = 1;
                this.character.stats.movement = 1;

                this.character.attack = {};
                this.character.attack.damage = 1;
                this.character.attack.power = 1;
                this.character.attack.speed = 1;
 
                this.character.spell = {};
                this.character.spell.power = 0;
                this.character.spell.regen = 0;

                this.character.defense = {};
                this.character.defense.armor = 0;
                this.character.defense.dodge = 0;
                this.character.defense.parry = 0;
                this.character.defense.block = 0;

                this.character.abilities = {};
                this.character.abilities.small = {};
                this.character.abilities.medium = {};
                this.character.abilities.large = {};
                this.character.abilities.super = {};

                this.character.savingThrows = [];
                this.character.inventory = [];
                this.character.quips = [];
                this.character.tags = [];                                               
            };
        }
    ])
    .factory('Priest', ['Character', 'ability', 'race', 'spec',
         function(Character, ability, race, spec) {
            'use strict';

            return function(name) {
                angular.extend(this,new Character(name));

                this.character.identity.race = race.elf.name;
                this.character.identity.spec = spec.priestess.name;
                this.character.abilities.small = ability.heal;
                this.character.abilities.medium = ability.bolt;
                this.character.abilities.large = ability.restoration;
                this.character.abilities.super = ability.prayer;
                this.character.spell.power = 10;
                this.character.spell.regen = 2;
                this.character.stats.health = 10;
                this.character.stats.maxhealth = 10;
                this.character.stats.energy = 30;
                this.character.stats.maxenergy = 30;
                this.character.stats.strength = 3;
                this.character.stats.agility = 4;
                this.character.stats.intelligence = 17;
                this.character.stats.wisdom = 19;
                this.character.stats.stamina = 9;
                this.character.stats.movement = 1;
                this.character.defense.armor = 1;

                this.character.savingThrows = [
                    'intellect', 'wisdom'  
                ];

            };
        }
    ]);