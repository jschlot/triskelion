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
                this.character.alignment.rating = "neutral neutral";
                this.character.alignment.ethics = 0;
                this.character.alignment.morals = 0;
                this.character.alignment.adjust = function(polarity, amount) {
                    var rating, morals = 'neutral', ethics = 'neutral';

                    if (polarity === 'morals') {
                        this.morals = this.morals + amount;
                    } else if (polarity === 'ethics') {
                        this.ethics = this.ethics + amount;
                    }

                    if (this.morals > (this.morals/4)) {
                        morals = 'good';
                    } else if (this.morals < -1 * (this.morals/4)) {
                        morals = 'evil';
                    }

                    if (this.ethics > (this.ethics/4)) {
                        ethics = 'lawful';
                    } else if (this.ethics < -1 * (this.ethics/4)) {
                        ethics = 'chaotic';
                    }
                    rating = ethics + " " + morals;
                    this.rating = rating;

                    return rating;
                };

                this.character.experience = {};
                this.character.experience.level = 1;
                this.character.experience.points = 0;
                this.character.experience.bonus = 1;
                this.character.experience.add = function(xp) {
                    var currentLevel = this.level;
                    var earned = xp + (xp * this.bonus);
                    this.points = this.points + earned;
                    this.level = Math.floor(this.points / 1000) + 1;
                    if (this.level > currentLevel) {
                        this.character.levelUp();
                    }
                    // should emit up a signal
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
                this.character.stats.charisma = 1;
                this.character.stats.movement = 1;

                this.character.abilities = {};
                this.character.abilities.small = {};
                this.character.abilities.medium = {};
                this.character.abilities.large = {};
                this.character.abilities.super = {};

                this.character.savingThrows = [];
                this.character.inventory = {};
                this.character.quips = [];
                this.character.tags = [];

                this.character.levelUp = function() {
                    console.debug("ding!");
                };
            };
        }
    ])
    .factory('Priestess', ['Character', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function(Character, diceService, ability, race, spec, armor, weapon) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));
                var self = this;

                this.character.identity.race = race.elf.name;
                this.character.identity.spec = spec.healer.name;
                this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                this.character.alignment.adjust('morals', diceService.roll(2,20));

                this.character.abilities.small = ability.heal;
                this.character.abilities.medium = ability.bolt;
                this.character.abilities.large = ability.restoration;
                this.character.abilities.super = ability.prayer;

                var initialHealth = diceService.roll(1,8);
                this.character.stats.health = initialHealth;
                this.character.stats.maxhealth = initialHealth;

                var initialEnergy = diceService.roll(1,16) + 22; // caster
                this.character.stats.energy = initialEnergy;
                this.character.stats.maxenergy = initialEnergy;

                this.character.stats.strength = diceService.roll(3,6);
                this.character.stats.agility = diceService.roll(3,6) + 2; // elf agi
                this.character.stats.intelligence = diceService.roll(2,6) + 8; // healer int
                this.character.stats.wisdom = diceService.roll(3,3) + 10; // healer int
                this.character.stats.stamina = diceService.roll(3,6);
                this.character.stats.charisma = diceService.roll(3,5) + 5; // elf cha

                this.character.savingThrows = [
                    'charisma', 'wisdom'
                ];

                this.character.inventory = {
                    armor: armor.cloth,
                    weapon: weapon.staff
                };

                this.character.levelUp = function() {
                    var level = self.character.experience.level;

                    var initialHealth = diceService.roll(level,8);
                    self.character.stats.health = initialHealth;
                    self.character.stats.maxhealth = initialHealth;

                    var initialEnergy = diceService.roll(level,16) + 22;
                    self.character.stats.energy = initialEnergy;
                    self.character.stats.maxenergy = initialEnergy;

                    return "ding";
                };

            };
        }
    ]);