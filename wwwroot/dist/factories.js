/* global angular */
angular
    .module('triskelion.party.factory', [])
    .factory('Party', ['objectFindByKey', 'infoText',
        function (objectFindByKey, infoText) {
            'use strict';

            var Party = function (name) {
                this.members = [];

                this.getMember = function(key, value) {
                    var lookup = objectFindByKey(this.members, key, value);
                    return (lookup) ? lookup : false;

                };

                this.partyHP = function() {
                    var partyHP = 0;

                    angular.forEach(this.members, function(player) {
                        if (player.character.status === 'alive') {
                            partyHP += player.character.stats.health;
                        }
                    });
                    return partyHP;
                };

                this.partyXPGivenWhenDead = function() {
                    var earnedXP = this.members.length * this.fetchExperiencePoints();
                    return earnedXP;
                };

                this.experience = {};
                this.experience.level = 1;
                this.experience.points = 0;
                this.experience.bonus = 0;

                this.addExperiencePoints = function (xp) {
                    var currentLevel = this.experience.level,
                        earned = xp + (xp * this.experience.bonus),
                        isDing = false;

                    this.experience.points = this.experience.points + earned;
                    this.experience.level = Math.floor( ( 1 + Math.sqrt( 1 + this.experience.points/125 ) ) / 2 );

                    if (this.experience.level > currentLevel) {
											angular.forEach(this.members, function(player) {
												player.character.updateHealth();
											});

                      isDing = true;
                    }
                    return isDing;
                };

                this.fetchExperiencePoints = function(levelSet) {
                    var level = (levelSet) ? levelSet : this.experience.level;
                    return Math.max(125 * ( Math.pow(2* level-1,2) - 1), 200);
                };

                this.boostExperiencePoints = function(level) {
                    var earnedExperiencePoints = this.fetchExperiencePoints(level);
                    this.addExperiencePoints(earnedExperiencePoints);
                };

                this.aoeDamage = function (event) {
                    var tells = [];
                    tells.push(event.description);
                    angular.forEach(this.members, function (player) {
                        if (player.character.stats.health > 0) {
                            var result = player.character.damage(event), message = '';

                            if (result.amount) {
                                message = infoText.auraDamage
                                    .replace(/PLAYER/, player.character.identity.name)
                                    .replace(/DAMAGE/, result.amount)
                                    .replace(/AURA/, event.aura);
                                if (result.death) {
                                    message += infoText.deathNote;
                                }
                                tells.push(message);

                            } else {
                                tells.push(infoText.auraMissed.replace(/PLAYER/, player.character.identity.name));
                            }
                        }
                    });

                    return tells;
                };

                this.aoeHeal = function (event) {
                    var tells = [];
                    tells.push(event.description);
                    angular.forEach(this.members, function (player) {
                        var result =  player.character.healing(event), message = '';
                        if (result.hit) {
                            message = infoText.auraHeal
                                .replace(/PLAYER/, player.character.identity.name)
                                .replace(/HEALTH/, result.amount)
                                .replace(/AURA/, event.aura);
                            tells.push(message);
                        } else {
                            tells.push(infoText.auraOverheal.replace(/PLAYER/, player.character.identity.name).replace(/OVERHEAL/, result.amount));
                        }
                    });

                    return tells;
                };
            };

            return Party;
        }
    ]);

/* global angular */
angular
    .module('triskelion.character.factory', ['triskelion.character.service'])
    .factory('Character', ['race', 'spec', 'diceService', 'partyDB',
        function (race, spec, diceService, partyDB) {
            'use strict';

            var Character = function (name) {
                this.name = (name) ? name : 'Grunt';
                this.created = new Date();
                this.hotkey = this.name.substr(0,1);
                this._this = this.name.toLowerCase();

                this.character = {};
								this.character.portrait = "generic.png";
                this.character.status = 'alive';
                this.character.hpDice = 3;

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

                this.character.stats = {};
                this.character.stats.health = 1;
                this.character.stats.maxhealth = 1;

                //// HEALTH OR ENERGY ADJUSTERS
                // These are not attached directly to stats, because they use the parent
                this.character.damage = function (attackAbility) {
                    var enemyAttackRoll = 0,
                        modifier = 0,
                        bonus = 0,
                        damage = 0,
                        isSuccess = false,
                        isDead = false;

                    enemyAttackRoll = diceService.roll(1,20);

                    modifier = Math.floor( this.stats[attackAbility.save] / 2 ) - 5;

                    // if the player has a saving throw bonus add a profiency bonus based on their party level
                    if (this.savingThrows.indexOf(attackAbility.save) > -1) {
                        bonus = Math.floor( partyDB.experience.level / 2 ) - 5;
                    }

                    //// compare the attackAbility's difficulty check to the player's saving throw
                    // if our roll is higher - we HIT, and the enemy is MISS
                    if ((modifier + bonus + this.inventory.armor.rating) >= (enemyAttackRoll + attackAbility.modifier)) {
                        if (attackAbility.miss) {
                            isSuccess = true;
                            damage = diceService.roll( attackAbility.miss.numberOfDice, attackAbility.miss.diceSides );
                            this.stats.health = this.stats.health - damage;
                        }
                    } else {
                        isSuccess = true;
                        damage = diceService.roll( attackAbility.hit.numberOfDice, attackAbility.hit.diceSides );
                        this.stats.health = this.stats.health - damage;
                    }

                    if (this.stats.health < 1) {
                        isDead = true;
                        this.stats.health = 0;
                        this.status = 'dead';
                    }

                    return { hit: isSuccess, amount: damage, death: isDead };

                };

                this.character.healing = function (benefitAbility) {
                    var healing = 0, updatedHealth = 0 + this.stats.health;

                    healing = diceService.roll( benefitAbility.hit.numberOfDice, benefitAbility.hit.diceSides );
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
                    var initialHealth = diceService.roll(partyDB.experience.level, this.hpDice) + this.hpDice;

                    this.stats.health = initialHealth;
                    this.stats.maxhealth = initialHealth;
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
                 this.character.updateHealth();

                 this.character.stats.wisdom = this.character.stats.dexterity + 7;
                 this.character.stats.charisma = this.character.stats.intelligence + 3;

                 this.character.savingThrows = [
                     'dexterity', 'intelligence'
                 ];
             };
         }
     ]);

/* global angular */
angular
    .module('triskelion.character.hero.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .service('heroMaker', ['actionDispatcher', 'Priest', 'Ranger', 'Wizard', 'Scout',
        function (actionDispatcher, Priest, Ranger, Wizard, Scout) {
            'use strict';

            this.spawn = function(player) {

                var hero = {
                    priest: function(player) { return new Priest(player.name); },
                    ranger: function(player) { return new Ranger(player.name); },
                    wizard: function(player) { return new Wizard(player.name); },
                    scout: function(player) { return new Scout(player.name); }
                };

                return actionDispatcher(hero[player.spec], player);
            };
        }
    ])
    .factory('Priest', ['Healer', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Healer, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Healer(name));

								 this.character.portrait = "priest.png";

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.priest.name;
                 this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                 this.character.alignment.adjust('morals', diceService.roll(2,20));

                 this.character.abilities.push(ability.heal);
                 this.character.abilities.push(ability.curewounds);

                 this.character.inventory = {
                     armor: armor.cloth,
                     weapon: weapon.staff
                 };
             };
         }
     ])
     .factory('Ranger', ['Fighter', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Fighter, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Fighter(name));

								 this.character.portrait = "ranger.png";

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.ranger.name;
                 this.character.alignment.adjust('ethics',  diceService.roll(2,20));

                 this.character.abilities.push(ability.aimedshot);

                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.bow
                 };
             };
         }
     ])
     .factory('Wizard', ['Caster', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Caster, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Caster(name));

								 this.character.portrait = "mage.png";

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.wizard.name;
                 this.character.alignment.adjust('ethics', -1 * diceService.roll(2,20));
                 this.character.alignment.adjust('morals', diceService.roll(2,20));

                 this.character.abilities.push(ability.missile);
                 this.character.abilities.push(ability.burninghands);

                 this.character.inventory = {
                     armor: armor.cloth,
                     weapon: weapon.wand
                 };
             };
         }
     ])
     .factory('Scout', ['Rogue', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Rogue, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Rogue(name));

								 this.character.portrait = "thief.png";

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.scout.name;
                 this.character.alignment.adjust('ethics', -1 * diceService.roll(2,20));
                 this.character.alignment.adjust('morals', -1 * diceService.roll(2,20));

                 this.character.abilities.push(ability.sneakattack);

                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.spear
                 };
             };
         }
     ]);

angular
    .module('triskelion.monster.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .service('monsterMaker', ['actionDispatcher', 'Fiend',
        function (actionDispatcher, Fiend) {
            'use strict';

            this.spawn = function(player) {

                var monster = {
                    fiend: function(player) { return new Fiend(player.spec); }
                };

                return actionDispatcher(monster[player.spec], player);
            };
        }
    ])
    .factory('Fiend', ['Rogue', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Rogue, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Rogue(name));

								 this.character.portrait = "enemy.png";

                 this.character.npc = true;
                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.scout.name;

                 this.character.hpDice = 4;
                 this.character.updateHealth();

                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.staff
                 };
             };
         }
     ]);
