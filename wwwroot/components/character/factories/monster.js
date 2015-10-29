angular
    .module('triskelion.monster.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .service('monsterMaker', ['actionDispatcher', 'Fiend',
        function (actionDispatcher, Fiend) {
            'use strict';

            this.spawn = function(player) {

                var monster = {
                    fiend: function(player) { return new Fiend(player.spec, player.level); }
                };

                return actionDispatcher(monster[player.spec], player);
            };
        }
    ])
    .factory('Fiend', ['Rogue', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Rogue, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name, level) {
                 angular.extend(this, new Rogue(name));

                 this.character.npc = true;
                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.scout.name;

                 this.character.hpDice = 4;
                 this.character.nrgDice = 6;

                 this.character.abilities.push(ability.fight);
                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.staff
                 };

                 this.character.updateHealth();
                 this.character.boostExperience(level);
             };
         }
     ]);
