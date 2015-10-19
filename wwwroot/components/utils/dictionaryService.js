/* global angular */
angular
    .module('triskelion.utils.dictionary.service', [])
    .service('infoText',
        function() {
            'use strict';
            var infoText = {
                startscreen: "Welcome to Triskelion.",
                choosemodule: "To begin, choose an adventure",
                mapscreen: "Map",
                actionchoice: "You chose STRING",
                auraDamage: "PLAYER takes DAMAGE points of damage from the AURA",
                auraHeal: "PLAYER receives HEALTH points of healing from the AURA",
                auraMissed: "PLAYER was missed",
                camp: "Camp",
                removePlayer: "Who will you ask to leave the party?",
                whowilljoin: "Who will you add to the party?",
                whowillleave: "Who will you remove to the party?",
                closeminimap: "R)eturn to Game",
                campingislovely: "Your team kicks it's collective shoes off, leans back, and smokes the halfling leaf for 2 turns...",
                deathNote: "and died",
                keys: {
                    name: "Name: VALUE",
                    type: "Class: VALUE",
                    health: "Health: VALUE",
                    abilities: "Abilities: VALUE",
                    race: "Race: VALUE"
                }
            };

            return infoText;
        }
    );
