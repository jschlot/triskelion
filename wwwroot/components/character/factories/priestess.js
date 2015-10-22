/* global angular */
angular
    .module('triskelion.character.priestess.factory', ['triskelion.character.factory', 'triskelion.character.service'])
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

                var initialHealth = diceService.roll(1,8); // healer dice
                this.character.stats.health = initialHealth;
                this.character.stats.maxhealth = initialHealth;

                var initialEnergy = diceService.roll(1,16) + 22; // healer nrg
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