/* global angular */
angular
    .module('triskelion.character.factory', ['triskelion.character.service'])
    .factory('Character', [
        function() {
            'use strict';

            return function() {
                this.character = {};
                this.character.meta = {};
                this.character.meta.created = new Date();

                this.character.identity = {};
				this.character.identity.name = 'grunt';
                this.character.identity.race = 'human';
                this.character.identity.class = 'fighter';

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
                this.character.stats.energy = 0;
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
    ]);