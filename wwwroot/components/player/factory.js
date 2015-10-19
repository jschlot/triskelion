/* global angular */
angular
    .module('triskelion.player.factory', [])
    .factory('Player',
        function() {
            'use strict';

            return function() {
                this.meta = {};
                this.meta.created = new Date();

				this.name = '';
                this.race = '';
                this.alignment = '';

                this.class = {};
                this.class.type = '';
                this.class.specialization = '';

                this.experience = {};
                this.experience.level = 1;
                this.experience.points = 0;
                
                this.health = 1;
                this.energy = 1;
                this.status = 'alive';
                this.movementSpeed = 1;

                this.stats = {};
                this.stats.strength = 1;
                this.stats.dexterity = 1;
                this.stats.intelligence = 1;
                this.stats.wisdom = 1;
                this.stats.constitution = 1;

                this.attack = {};
                this.attack.damage = 1;
                this.attack.power = 1;
                this.attack.speed = 1;
 
                this.spell = {};
                this.spell.power = 1;
                this.spell.regen = 1;

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