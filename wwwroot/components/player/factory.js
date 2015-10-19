/* global angular */
angular
    .module('triskelion.player.factory', [])
    .factory('Player',
        function() {
            'use strict';

            return function() {
                this.meta = {};
                this.meta.created = function(date) {
                    return (date) ? date : new Date();
                };

                this.identity = {};
				this.identity.name = 'skeleton';
                this.identity.race = 'human';
                this.identity.alignment = 'neutral';
                this.identity.class = 'fighter';
                this.identity.status = 'undead';

                this.experience = {};
                this.experience.level = 1;
                this.experience.points = 0;
                this.experience.bonus = 0;
                
                this.stats = {};
                this.stats.health = 1;
                this.stats.energy = 1;
                this.stats.strength = 1;
                this.stats.agility = 1;
                this.stats.intelligence = 1;
                this.stats.wisdom = 1;
                this.stats.stamina = 1;
                this.stats.movement = 1;

                this.attack = {};
                this.attack.damage = 1;
                this.attack.power = 1;
                this.attack.speed = 1;
 
                this.spell = {};
                this.spell.power = 0;
                this.spell.regen = 0;

                this.defense = {};
                this.defense.armor = 0;
                this.defense.dodge = 0;
                this.defense.parry = 0;
                this.defense.block = 0;

                this.savingThrows = [];
                this.abilities = [];
                this.inventory = [];
                this.quips = [];
                this.tags = [];
                                
            };
        }
    );