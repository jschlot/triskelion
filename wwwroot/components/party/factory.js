/* global angular */
angular
    .module('triskelion.party.factory', [])
    .factory('Party', ['objectFindByKey', 'infoText',
        function (objectFindByKey, infoText) {
            'use strict';

            var Party = function (name) {
                this.members = [];

                this.getMember = function(key, value) {
                    var lookup = objectFindByKey(this.members, key, value);
                    return (lookup) ? lookup : false;

                };

                this.partyHP = function() {
                    var partyHP = 0;

                    angular.forEach(this.members, function(player) {
                        if (player.character.status === 'alive') {
                            partyHP += player.character.stats.health;
                        }
                    });
                    return partyHP;
                };

                this.partyXPGivenWhenDead = function() {
                    var earnedXP = this.members.length * this.fetchExperiencePoints();
                    return earnedXP;
                };

                this.experience = {};
                this.experience.level = 1;
                this.experience.points = 0;
                this.experience.bonus = 0;

                this.addExperiencePoints = function (xp) {
                    var currentLevel = this.experience.level,
                        earned = xp + (xp * this.experience.bonus),
                        isDing = false;

                    this.experience.points = this.experience.points + earned;
                    this.experience.level = Math.floor( ( 1 + Math.sqrt( 1 + this.experience.points/125 ) ) / 2 );

                    if (this.experience.level > currentLevel) {
											angular.forEach(this.members, function(player) {
												player.character.updateHealth();
											});

                      isDing = true;
                    }
                    return isDing;
                };

                this.fetchExperiencePoints = function(levelSet) {
                    var level = (levelSet) ? levelSet : this.experience.level;
                    return Math.max(125 * ( Math.pow(2* level-1,2) - 1), 200);
                };

                this.boostExperiencePoints = function(level) {
                    var earnedExperiencePoints = this.fetchExperiencePoints(level);
                    this.addExperiencePoints(earnedExperiencePoints);
                };

                this.aoeDamage = function (event) {
                    var tells = [];
                    tells.push(event.description);
                    angular.forEach(this.members, function (player) {
                        if (player.character.stats.health > 0) {
                            var result = player.character.damage(event), message = '';

                            if (result.amount) {
                                message = infoText.auraDamage
                                    .replace(/PLAYER/, player.character.identity.name)
                                    .replace(/DAMAGE/, result.amount)
                                    .replace(/AURA/, event.aura);
                                if (result.death) {
                                    message += infoText.deathNote;
                                }
                                tells.push(message);

                            } else {
                                tells.push(infoText.auraMissed.replace(/PLAYER/, player.character.identity.name));
                            }
                        }
                    });

                    return tells;
                };

                this.aoeHeal = function (event) {
                    var tells = [];
                    tells.push(event.description);
                    angular.forEach(this.members, function (player) {
                        var result =  player.character.healing(event), message = '';
                        if (result.hit) {
                            message = infoText.auraHeal
                                .replace(/PLAYER/, player.character.identity.name)
                                .replace(/HEALTH/, result.amount)
                                .replace(/AURA/, event.aura);
                            tells.push(message);
                        } else {
                            tells.push(infoText.auraOverheal.replace(/PLAYER/, player.character.identity.name).replace(/OVERHEAL/, result.amount));
                        }
                    });

                    return tells;
                };
            };

            return Party;
        }
    ]);
