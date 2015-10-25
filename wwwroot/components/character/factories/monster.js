angular
    .module('triskelion.monster.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .service('monsterMaker', ['actionDispatcher', 'Fiend',
        function (actionDispatcher, Fiend) {
            'use strict';

            this.spawn = function(player) {

                var monster = {
                    fiend: function(name) { return new Fiend(name); }
                };

                return actionDispatcher(monster[player.spec], player.spec);
            };
        }
    ])
    .factory('Fiend', ['Rogue', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Rogue, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Rogue(name));

                 this.character.npc = true;
                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.scout.name;

                 this.character.hpDice = 4;
                 this.character.nrgDice = 6;
                 this.character.updateHealth();

                 this.character.abilities.push(ability.stab);

                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.staff
                 };
             };
         }
     ]);
