/* global angular */
angular
    .module('triskelion.character.factory', ['triskelion.character.service'])
    .factory('Character', ['ability', 'race', 'spec', 'diceService',
        function(ability, race, spec, diceService) {
            'use strict';

            var Character = function(name) {
                this.name = (name) ? name : 'Grunt';
                this.created = new Date();
                this.hotkey = this.name.substr(0,1);
                this._this = this.name.toLowerCase();

                this.character = {};
                this.character.hpDice = 3;
                this.character.nrgDice = 4;

                this.character.identity = {};
				this.character.identity.name = this.name;
                this.character.identity.race = race.human.name;
                this.character.identity.spec = spec.knight.name;

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
                this.character.stats.energy = 1;
                this.character.stats.maxenergy = 1;

                this.character.stats.updateHealth = function(level, hpDice,nrgDice) {
                    var initialHealth = diceService.roll(level, hpDice) + hpDice;
                    this.health = initialHealth;
                    this.maxhealth = initialHealth;

                    var initialEnergy = diceService.roll(level, nrgDice) + nrgDice;
                    this.energy = initialEnergy;
                    this.maxenergy = initialEnergy;
                };

                this.character.stats.strength = diceService.roll(3,6);
                this.character.stats.agility = diceService.roll(3,6);
                this.character.stats.intelligence = diceService.roll(3,6);
                this.character.stats.wisdom = diceService.roll(3,6);
                this.character.stats.stamina = diceService.roll(3,6);
                this.character.stats.charisma = diceService.roll(3,6);
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
                    this.character.stats.updateHealth(this.experience.level, this.hpDice, this.nrgDice);
                    return "ding";
                };
            };
            return Character;
        }
    ])
    .factory('Caster', ['Character', 'diceService',
         function(Character, diceService) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));

                this.character.hpDice = 6;
                this.character.nrgDice = 12;
                this.character.stats.updateHealth(this.character.experience.level, this.character.hpDice, this.character.nrgDice);

                this.character.stats.intelligence = this.character.stats.intelligence + 5;
                this.character.stats.wisdom = this.character.stats.wisdom + 5;

                this.character.savingThrows = [
                    'intelligence', 'wisdom'
                ];
            };
        }
    ])
    .factory('Fighter', ['Character', 'diceService',
         function(Character, diceService) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));

                this.character.hpDice = 10;
                this.character.nrgDice = 10;
                this.character.stats.updateHealth(this.character.experience.level, this.character.hpDice, this.character.nrgDice);

                this.character.stats.strength = this.character.stats.strength + 6;
                this.character.stats.stamina = this.character.stats.stamina + 4;

                this.character.savingThrows = [
                    'strength', 'stamina'
                ];
            };
        }
    ])
    .factory('Healer', ['Character', 'diceService',
         function(Character, diceService) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));

                this.character.hpDice = 8;
                this.character.nrgDice = 16;

                this.character.stats.updateHealth(this.character.experience.level, this.character.hpDice, this.character.nrgDice);

                this.character.stats.wisdom = this.character.stats.wisdom + 7;
                this.character.stats.charisma = this.character.stats.charisma + 3;

                this.character.savingThrows = [
                    'charisma', 'wisdom'
                ];
            };
        }
    ])
    .factory('Rogue', ['Character', 'diceService',
         function(Character, diceService) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));

                this.character.hpDice = 8;
                this.character.nrgDice = 12;
                this.character.stats.updateHealth(this.character.experience.level, this.character.hpDice, this.character.nrgDice);

                this.character.stats.wisdom = this.character.stats.dexterity + 7;
                this.character.stats.charisma = this.character.stats.intelligence + 3;

                this.character.savingThrows = [
                    'dexterity', 'intelligence'
                ];
            };
        }
    ]);