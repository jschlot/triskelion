/* global angular */
angular
    .module('triskelion.character.elf.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .factory('Priest', ['Character', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function(Character, diceService, ability, race, spec, armor, weapon) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));
                var self = this;
                var hpDice = 8;
                var nrgDice = 16;

                this.character.identity.race = race.elf.name;
                this.character.identity.spec = spec.healer.name;
                this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                this.character.alignment.adjust('morals', diceService.roll(2,20));

                this.character.abilities.small = ability.heal;
                this.character.abilities.medium = ability.bolt;
                this.character.abilities.large = ability.restoration;
                this.character.abilities.super = ability.prayer;

                var initialHealth = diceService.roll(1,hpDice);
                this.character.stats.health = initialHealth;
                this.character.stats.maxhealth = initialHealth;

                var initialEnergy = diceService.roll(1,nrgDice) + 22;
                this.character.stats.energy = initialEnergy;
                this.character.stats.maxenergy = initialEnergy;

                this.character.stats.strength = diceService.roll(3,6);
                this.character.stats.agility = diceService.roll(3,6) + 2;
                this.character.stats.intelligence = diceService.roll(2,6) + 8;
                this.character.stats.wisdom = diceService.roll(3,3) + 10;
                this.character.stats.stamina = diceService.roll(3,6);
                this.character.stats.charisma = diceService.roll(3,5) + 5;

                this.character.savingThrows = [
                    'charisma', 'wisdom'
                ];

                this.character.inventory = {
                    armor: armor.cloth,
                    weapon: weapon.staff
                };

                this.character.levelUp = function() {
                    var level = self.character.experience.level;

                    var initialHealth = diceService.roll(level,hpDice);
                    self.character.stats.health = initialHealth;
                    self.character.stats.maxhealth = initialHealth;

                    var initialEnergy = diceService.roll(level,nrgDice) + 22;
                    self.character.stats.energy = initialEnergy;
                    self.character.stats.maxenergy = initialEnergy;

                    return "ding";
                };

            };
        }
    ])
    .factory('Ranger', ['Character', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function(Character, diceService, ability, race, spec, armor, weapon) {
            'use strict';

            return function(name) {
                angular.extend(this, new Character(name));
                var self = this;

                var hpDice = 10;
                var nrgDice = 10;

                this.character.identity.race = race.elf.name;
                this.character.identity.spec = spec.fighter.name;
                this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                // leave neutral this.character.alignment.adjust('morals', diceService.roll(2,20));

                this.character.abilities.small = ability.heal;
                this.character.abilities.medium = ability.bolt;
                this.character.abilities.large = ability.restoration;
                this.character.abilities.super = ability.prayer;

                var initialHealth = diceService.roll(1,hpDice);
                this.character.stats.health = initialHealth;
                this.character.stats.maxhealth = initialHealth;

                var initialEnergy = diceService.roll(1,nrgDice) + 22;
                this.character.stats.energy = initialEnergy;
                this.character.stats.maxenergy = initialEnergy;

                this.character.stats.strength = diceService.roll(2,6) + 8;
                this.character.stats.agility = diceService.roll(3,6) + 2; // elf agi
                this.character.stats.intelligence = diceService.roll(3,6);
                this.character.stats.wisdom = diceService.roll(3,6);
                this.character.stats.stamina = diceService.roll(2,6) + 6;
                this.character.stats.charisma = diceService.roll(3,5) + 5; // elf cha

                this.character.savingThrows = [
                    'strength', 'constitution'
                ];

                this.character.inventory = {
                    armor: armor.cloth,
                    weapon: weapon.staff
                };

                this.character.levelUp = function() {
                    var level = self.character.experience.level;

                    var initialHealth = diceService.roll(level,hpDice);
                    self.character.stats.health = initialHealth;
                    self.character.stats.maxhealth = initialHealth;

                    var initialEnergy = diceService.roll(level,nrgDice) + 22;
                    self.character.stats.energy = initialEnergy;
                    self.character.stats.maxenergy = initialEnergy;

                    return "ding";
                };

            };
        }
    ]);