/* global angular */
angular
    .module('triskelion.character.hero.factory', ['triskelion.character.factory', 'triskelion.character.service'])
    .service('heroMaker', ['actionDispatcher', 'Priest', 'Ranger',
        function (actionDispatcher, Priest, Ranger) {
            'use strict';

            this.spawn = function(player) {

                var hero = {
                    priest: function(player) { return new Priest(player.name); },
                    ranger: function(player) { return new Ranger(player.name); }
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

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.priest.name;
                 this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                 this.character.alignment.adjust('morals', diceService.roll(2,20));

                 this.character.abilities.push(ability.heal);

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

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.ranger.name;
                 this.character.alignment.adjust('ethics',  diceService.roll(2,20));
                 // leave neutral // this.character.alignment.adjust('morals', diceService.roll(2,20));

                 this.character.abilities.push(ability.powershot);

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

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.wizard.name;
                 this.character.alignment.adjust('ethics', -1 * diceService.roll(2,20));
                 this.character.alignment.adjust('morals', diceService.roll(2,20));

                 this.character.abilities.push(ability.fireball);

                 this.character.inventory = {
                     armor: armor.cloth,
                     weapon: weapon.staff
                 };
             };
         }
     ])
     .factory('Scout', ['Rogue', 'diceService', 'ability', 'race', 'spec', 'armor', 'weapon',
         function (Rogue, diceService, ability, race, spec, armor, weapon) {
             'use strict';

             return function (name) {
                 angular.extend(this, new Rogue(name));

                 this.character.identity.race = race.elf.name;
                 this.character.identity.spec = spec.scout.name;
                 this.character.alignment.adjust('ethics', -1 * diceService.roll(2,20));
                 this.character.alignment.adjust('morals', -1 * diceService.roll(2,20));

                 this.character.abilities.push(ability.cheapshot);

                 this.character.inventory = {
                     armor: armor.leather,
                     weapon: weapon.spear
                 };
             };
         }
     ]);
