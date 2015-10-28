/* global angular */
angular
    .module('triskelion.utils.dictionary.service', [])
    .service('sarcasticQuips',
        function () {
            'use strict';
            var sarcasticQuips = [
                'Huh? What was that?',
                'I don\'t get it.',
                'Whatever did you mean?',
                'Hmmm, I don\'t think you typed that right.',
                'I didn\'t recognize your request.'
            ];

            return sarcasticQuips;
        }
    )
    .service('sarcasticOuches',
        function () {
            'use strict';
            var sarcasticOuches = [
                'Ouch!',
                'Thwack!'
            ];

            return sarcasticOuches;
        }
    )
    .service('infoText',
        function () {
            'use strict';
            var infoText = {
                chooseEnemy: "Choose a enemy to fight.",
                chooseSpell: "Choose a spell to cast.",
                chooseItem: "Choose an item to use?",
                chosenThing: "PLAYER uses THING and EFFECT.",
                startscreen: 'Welcome to Triskelion.',
                choosemodule: 'To begin, choose an adventure',
                mapscreen: 'Map',
                combatscreen: 'Combat',
                camp: 'Camp',
                actionchoice: 'You chose STRING',
                playerRuns: "PLAYER flees.",
                chooseTargetGroup: "Cast on Party member or a Mob?",
                chooseTargetPlayer: "Who is your target?",
                initiativeRolled: 'TEAM wins the advantage, and will go first',
                auraDamage: 'PLAYER takes DAMAGE points of damage from the AURA',
                auraHeal: 'PLAYER receives HEALTH points of healing from the AURA',
                auraMissed: 'PLAYER was missed',
                auraOverheal: 'PLAYER was overhealed by OVERHEAL',
                playerTurn: 'It is PLAYER\'s turn',
                removePlayer: 'Who will you ask to leave the party?',
                whowilljoin: 'Who will you add to the party?',
                whowillleave: 'Who will you remove to the party?',
                closeminimap: 'R)eturn to Game',
                campingislovely: 'Your team kicks it\'s collective shoes off, leans back, and smokes the halfling leaf for 2 turns...',
                deathNote: ' and has died',
                alldead: 'All players in the party are dead. You must return to camp.',
                charactersheet: 'Character Sheet: CHARACTER',
                describeCharacter: 'NAME, lvl LEVEL RACE SPEC',
                keys: {
                    name: 'Name: VALUE',
                    spec: 'Spec: VALUE',
                    armor: 'Armor: VALUE',
                    health: 'Health: VALUE',
                    energy: 'Energy: VALUE',
                    abilities: 'Abilities: VALUE',
                    race: 'Race: VALUE'
                }
            };

            return infoText;
        }
    );
