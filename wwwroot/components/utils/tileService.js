/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .service('tileService', ['actionDispatcher', 'userData', 'infoText', 'diceService', 'partyDB',
        function (actionDispatcher, userData, infoText, diceService, partyDB) {
            'use strict';

            this.action = function (value) {
                var actionsList = [],
                    lookup, event, messages = [], tells = value.tells, gameMode = 'exploration';

                // the exit
                if (value._self === 255) {
                    return 'recap';
                } else if (value._self < 32) {
                    return gameMode;
                }

                actionsList = userData.gameModuleSelected.tileActions;
                lookup = value._self - 32;
                event = actionsList[lookup];

                switch (event.actionType) {
                    case 'damage':
                        messages = partyDB.aoeDamage(event);
                        if (messages.length) {
                            this.spoolMessages(tells, messages);
                        }
                        break;
                    case 'heal':
                        messages = partyDB.aoeHeal(event);
                        if (messages.length) {
                            this.spoolMessages(tells, messages);
                        }
                        break;
                    case 'combat':
                        gameMode = 'combat';
                        break;
                    case 'social':
                        gameMode = 'social';
                        break;
                    case 'container':
                        gameMode = 'container';
                        break;
                    case 'message':
                        this.spoolMessages(tells, [event.description]);
                        break;
                }
                return gameMode;
            };

            this.spoolMessages = function(tells, messages) {
                angular.forEach(messages, function(value) {
                    tells.push(value);
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
                } else if (tile === 27 || tile === 255) {
                    isDoor = 'ew-arch';
                } else if (tile === 28 || tile === 254) {
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
                'NOTHING': 0x00,
                'FLOOR': 0x18
            };
        }
    ]);
