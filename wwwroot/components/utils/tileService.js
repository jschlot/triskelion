/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .service('tileService', ['actionDispatcher', 'userData', 'infoText', 'diceService',
        function(actionDispatcher, userData, infoText, diceService) {
            'use strict';

            this.action = function(value) {
                var actionsList = [];
                actionsList = userData.gameModuleSelected.tileActions;
                var lookup = value._self - 32;
                var event = actionsList[lookup];

                switch (event.actionType) {
                    case 'damage':
                        this.damage(value, event);
                        break;
                    case 'heal':
                        this.heal(value, event);
                        break;
                    case 'message':
                        this.message(value, event);
                        break;
                }

            };
            
            this.message = function(obj, aura) {
                obj.tells.push(aura.description);
            };

            this.damage = function(obj, aura) {
                obj.tells.push(aura.description);

                angular.forEach(obj.party, function(player, key) {
                    var message = "";
                    var damage = diceService.roll(aura.numberOfDice,aura.diceSides);
                    var savingThrow = diceService.roll(1,20);

                    if (player.health < 1) {
                        return;
                    }

                    if (savingThrow < aura.savingThrow) {
                        player.health = player.health - damage;

                        message = infoText.auraDamage
                            .replace(/PLAYER/, player.name)
                            .replace(/DAMAGE/, damage)
                            .replace(/AURA/, aura.type);

                        if (player.health < 1) { 
                            player.health = 0;
                            message = message + infoText.deathNote;
                        }

                        obj.tells.push(message);
                    } else {
                        obj.tells.push(infoText.auraMissed.replace(/PLAYER/, player.name));                                    
                    } 
                });
            };

            this.heal = function(obj, aura) {
                obj.tells.push(aura.description);

                angular.forEach(obj.party, function(player, key) {
                    var message = "";
                    var health = diceService.roll(aura.numberOfDice,aura.diceSides);

                    if (player.health >= player.maxhealth) {
                        return;
                    }

                    player.health = player.health + health;

                    message = infoText.auraHeal
                        .replace(/PLAYER/, player.name)
                        .replace(/HEALTH/, health)
                        .replace(/AURA/, aura.type);

                    obj.tells.push(message);
                });
            };

            this.isBlock = function(tile) {
                return (tile < 18) ? true : false;
            };
            
            this.isDoor = function(tile) {
                var isDoor;
                if (tile === 26) {
                    isDoor = "ns-unlocked";
                } else if (tile === 25) {
                    isDoor = "ew-unlocked";
                } else if (tile === 5) {
                    isDoor = "ns-locked";
                } else if (tile === 4) {
                    isDoor = "ew-locked";
                } else if (tile === 27) {
                    isDoor = "ew-arch";
                } else if (tile === 28) {
                    isDoor = "ns-arch";
                }
                return isDoor;
            };
                       
            this.canGoForward = function(tile) {
                return (tile > 23) ? true : false;
            };

            this.mapClass = function(tile) {
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