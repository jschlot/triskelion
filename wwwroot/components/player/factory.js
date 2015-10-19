/* global angular */
angular
    .module('triskelion.player.factory', [])
    .factory('Player',
        function() {
            'use strict';

            return function() {
                this.character.meta = {};
                this.character.meta.created = function(date) {
                    return (date) ? date : new Date();
                };

                this.character.identity = {};
				this.character.identity.name = 'skeleton';
                this.character.identity.race = 'human';
                this.character.identity.class = 'fighter';

                this.character.status = function() {
                    return 'undead';
                };

                this.character.alignment = {};
                this.character.alignment.points = {};
                this.character.alignment.points.evil = 0;
                this.character.alignment.points.good = 0;
                this.character.alignment.points.order = 0;
                this.character.alignment.points.chaos = 0;

                this.character.alignment.rating = function() {
                    var morals = 'neutral', ethics = 'neutral';

                    return morals + " " + ethics;
                };

                this.character.experience = {};
                this.character.experience.level = 1;
                this.character.experience.points = 0;
                this.character.experience.bonus = 0;
                
                this.character.stats = {};
                this.character.stats.health = 1;
                this.character.stats.energy = 1;
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

                this.character.savingThrows = [];
                this.character.abilities = [];
                this.character.inventory = [];
                this.character.quips = [];
                this.character.tags = [];
                                
            };
        }
    );