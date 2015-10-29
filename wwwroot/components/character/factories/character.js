/* global angular */
angular
    .module('triskelion.character.factory', ['triskelion.character.service'])
    .factory('Character', ['race', 'spec', 'diceService',
        function (race, spec, diceService) {
            'use strict';

            var Character = function (name) {
                this.name = (name) ? name : 'Grunt';
                this.created = new Date();
                this.hotkey = this.name.substr(0,1);
                this._this = this.name.toLowerCase();

                this.character = {};
                this.character.status = 'alive';
                this.character.hpDice = 3;
                this.character.nrgDice = 4;

                this.character.identity = {};
                this.character.identity.name = this.name;
                this.character.identity.race = race.human.name;
                this.character.identity.spec = spec.knight.name;

                this.character.alignment = {};
                this.character.alignment.rating = 'neutral neutral';
                this.character.alignment.ethics = 0;
                this.character.alignment.morals = 0;
                this.character.alignment.adjust = function (polarity, amount) {
                    var rating, morals = 'neutral', ethics = 'neutral';

                    if (polarity === 'morals') {
                        this.morals = this.morals + amount;
                    } else if (polarity === 'ethics') {
                        this.ethics = this.ethics + amount;
                    }

                    if (this.morals > (this.morals / 4)) {
                        morals = 'good';
                    } else if (this.morals < -1 * (this.morals / 4)) {
                        morals = 'evil';
                    }

                    if (this.ethics > (this.ethics / 4)) {
                        ethics = 'lawful';
                    } else if (this.ethics < -1 * (this.ethics / 4)) {
                        ethics = 'chaotic';
                    }
                    rating = ethics + ' ' + morals;
                    this.rating = rating;

                    return rating;
                };

                this.character.experience = {};
                this.character.experience.level = 1;
                this.character.experience.points = 0;
                this.character.experience.bonus = 1;
                this.character.addXP = function (xp) {
                    var currentLevel = this.experience.level,
                        earned = xp + (xp * this.experience.bonus);

                    this.experience.points = this.experience.points + earned;
                    this.experience.level = Math.floor( ( 1 + Math.sqrt( 1 + this.experience.points/125 ) ) / 2 );

                    if (this.experience.level > currentLevel) {
                        this.levelUp();
                    }
                    return { amount: earned };
                };

                this.character.fetchXP = function(levelSet) {
                    var level = (levelSet) ? levelSet : this.experience.level;
                    return Math.max(125 * ( Math.pow(2* level-1,2) - 1), 200);
                };

                this.character.boostExperience = function(level) {
                    var earnedXP = this.fetchXP(level);
                    this.addXP(earnedXP);
                };

                this.character.stats = {};
                this.character.stats.health = 1;
                this.character.stats.maxhealth = 1;
                this.character.stats.energy = 1;
                this.character.stats.maxenergy = 1;

                //// HEALTH OR ENERGY ADJUSTERS
                // These are not attached directly to stats, because they use the parent
                this.character.damage = function (event) {
                    var savingThrow = 0,
                        modifier = 0,
                        bonus = 0,
                        damage = 0,
                        isSuccess = false,
                        isDead = false;

                    //// PLAYER SAVING THROW
                    // roll a d20 and add a modifier based on the rating to the d20 rolled above
                    savingThrow = diceService.roll( 1, 20 );
                    modifier = Math.floor( this.stats[event.save] / 2 ) - 5;

                    // if the player has a saving throw bonus add a profiency bonus based on their level
                    if (this.savingThrows.indexOf(event.save) > -1) {
                        bonus = Math.floor( this.experience.level / 2 ) - 5;
                    }

                    //// compare the event's difficulty check to the player's saving throw
                    // if our roll is higher - we HIT, and the enemy is MISS
                    if ((savingThrow + modifier + bonus) >= (event.check + event.modifier)) {
                        isSuccess = true;
                        if (event.miss) {
                            damage = diceService.roll( event.miss.numberOfDice, event.miss.diceSides );
                            this.stats.health = this.stats.health - damage;
                        }
                    } else {
                        damage = diceService.roll( event.hit.numberOfDice, event.hit.diceSides );
                        this.stats.health = this.stats.health - damage;
                    }

                    if (this.stats.health < 1) {
                        isDead = true;
                        this.stats.health = 0;
                        this.status = 'dead';
                    }

                    return { hit: isSuccess, amount: damage, death: isDead };

                };

                this.character.healing = function (event) {
                    var healing = 0, updatedHealth = 0 + this.stats.health;

                    healing = diceService.roll( event.hit.numberOfDice, event.hit.diceSides );
                    updatedHealth += healing;

                    if (updatedHealth <= this.stats.maxhealth) {
                        this.stats.health = updatedHealth;
                    } else {
                        this.stats.health = 0 + this.stats.maxhealth;
                    }

                    this.status = 'alive';

                    return { hit: true, amount: healing };
                };

                this.character.updateHealth = function () {
                    var initialHealth = diceService.roll(this.experience.level, this.hpDice) + this.hpDice,
                        initialEnergy = diceService.roll(this.experience.level, this.nrgDice) + this.nrgDice;

                    this.stats.health = initialHealth;
                    this.stats.maxhealth = initialHealth;

                    this.stats.energy = initialEnergy;
                    this.stats.maxenergy = initialEnergy;
                };

                this.character.stats.strength = diceService.roll(3,6);
                this.character.stats.agility = diceService.roll(3,6);
                this.character.stats.intelligence = diceService.roll(3,6);
                this.character.stats.wisdom = diceService.roll(3,6);
                this.character.stats.stamina = diceService.roll(3,6);
                this.character.stats.charisma = diceService.roll(3,6);
                this.character.stats.movement = 1;

                this.character.abilities = [];
                this.character.savingThrows = [];
                this.character.inventory = {};
                this.character.quips = [];
                this.character.tags = [];

                this.character.levelUp = function () {
                    this.updateHealth();
                    return 'ding';
                };
            };
            return Character;
        }
    ])
    .factory('Caster', ['Character', 'diceService',
         function (Character, diceService) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Character(name));

                 this.character.hpDice = 6;
                 this.character.nrgDice = 12;
                 this.character.updateHealth();

                 this.character.stats.intelligence = this.character.stats.intelligence + 5;
                 this.character.stats.wisdom = this.character.stats.wisdom + 5;

                 this.character.savingThrows = [
                     'intelligence', 'wisdom'
                 ];
             };
         }
     ])
     .factory('Fighter', ['Character', 'diceService',
         function (Character, diceService) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Character(name));

                 this.character.hpDice = 10;
                 this.character.nrgDice = 10;
                 this.character.updateHealth();

                 this.character.stats.strength = this.character.stats.strength + 6;
                 this.character.stats.stamina = this.character.stats.stamina + 4;

                 this.character.savingThrows = [
                     'strength', 'stamina'
                 ];
             };
         }
     ])
     .factory('Healer', ['Character', 'diceService',
         function (Character, diceService) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Character(name));

                 this.character.hpDice = 8;
                 this.character.nrgDice = 16;

                 this.character.updateHealth();

                 this.character.stats.wisdom = this.character.stats.wisdom + 7;
                 this.character.stats.charisma = this.character.stats.charisma + 3;

                 this.character.savingThrows = [
                     'charisma', 'wisdom'
                 ];
             };
         }
     ])
     .factory('Rogue', ['Character', 'diceService',
         function (Character, diceService) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Character(name));

                 this.character.hpDice = 8;
                 this.character.nrgDice = 12;
                 this.character.updateHealth();

                 this.character.stats.wisdom = this.character.stats.dexterity + 7;
                 this.character.stats.charisma = this.character.stats.intelligence + 3;

                 this.character.savingThrows = [
                     'dexterity', 'intelligence'
                 ];
             };
         }
     ]);
