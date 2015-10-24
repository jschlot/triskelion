/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .service('tileService', ['actionDispatcher', 'userData', 'infoText', 'diceService',
        function (actionDispatcher, userData, infoText, diceService) {
            'use strict';

            this.action = function (value) {
                var actionsList = [],
                    lookup, event, party, tells, gameMode = 'exploration';

                actionsList = userData.gameModuleSelected.tileActions;

                if (value._self < 32) {
                    return;
                }

                lookup = value._self - 32;
                console.log(lookup);
                console.log(event);

                event = actionsList[lookup];
                party = value.party;
                tells = value.tells;

                switch (event.actionType) {
                    case 'damage':
                        this.aoeDamage(tells, event, party);
                        break;
                    case 'heal':
                        this.aoeHeal(tells, event, party);
                        break;
                    case 'combat':
                        gameMode = 'combat';
                        break;
                    case 'social':
                        gameMode = 'social';
                        break;
                    default:
                        this.message(tells, event);
                }
                return gameMode;
            };

            this.message = function (tells, event) {
                tells.push(event.description);
            };

            this.aoeDamage = function (tells, event, party) {
                tells.push(event.description);
                angular.forEach(party, function (player) {
                    if (player.character.stats.health > 0) {
                        var result = player.character.damage(event), message = '';

                        if (result.amount) {
                            message = infoText.auraDamage
                                .replace(/PLAYER/, player.character.identity.name)
                                .replace(/DAMAGE/, result.amount)
                                .replace(/AURA/, event.aura);
                            tells.push(message);
                        } else {
                            tells.push(infoText.auraMissed.replace(/PLAYER/, player.character.identity.name));
                        }

                        if (result.death) {
                            tells.push(infoText.deathNote.replace(/PLAYER/, player.character.identity.name));
                        }
                    }
                });
            };

            this.aoeHeal = function (tells, event, party) {
                tells.push(event.description);
                angular.forEach(party, function (player) {
                    var result =  player.character.healing(event), message = '';
                    if (result.success) {
                        message = infoText.auraHeal
                            .replace(/PLAYER/, player.character.identity.name)
                            .replace(/HEALTH/, result.amount)
                            .replace(/AURA/, event.aura);
                        tells.push(message);
                    } else {
                        tells.push(infoText.auraOverheal.replace(/PLAYER/, player.character.identity.name).replace(/OVERHEAL/, result.amount));
                    }
                });
            };

            this.isBlock = function (tile) {
                return (tile < 24) ? true : false;
            };

            this.isDoor = function (tile) {
                var isDoor;
                if (tile === 26) {
                    isDoor = 'ns-unlocked';
                } else if (tile === 25) {
                    isDoor = 'ew-unlocked';
                } else if (tile === 5) {
                    isDoor = 'ns-locked';
                } else if (tile === 4) {
                    isDoor = 'ew-locked';
                } else if (tile === 27) {
                    isDoor = 'ew-arch';
                } else if (tile === 28) {
                    isDoor = 'ns-arch';
                }
                return isDoor;
            };

            this.canGoForward = function (tile) {
                return (tile > 23) ? true : false;
            };

            this.mapClass = function (tile) {
                var mapClass = 'wall';
                if (tile > 23) {
                    mapClass = 'floor';
                } else if (tile === 4) {
                    mapClass = 'floor';
                } else if (tile === 5) {
                    mapClass = 'floor';
                }

                return mapClass;
            };

            this.set = {
                'NOTHING': 0x00
            };
        }
    ]);
