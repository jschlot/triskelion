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
