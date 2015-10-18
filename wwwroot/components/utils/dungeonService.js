/* global angular */
angular
    .module('triskelion.utils.dungeon.service', [])
    .service('gameModules', ['diceService', 'infoText',
        function(diceService, infoText) {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapRows: 12, // offset by 1
                    mapCols: 11, // offset by 1
                    defaultCompassDirection: 'east',
                    defaultLevel: 0,
                    startingCoordinates: [2,2], // [ X, Y ]
                    map: [
                        {
                            name: "The Catacombs",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x80, 0x18, 0x81, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 2

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 3

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01],  // 4

                                [0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 5

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 6

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 7

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 8

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01],  // 9

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10

                            ]
                        },
                        {
                            name: "The Crypt",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 2

                                [0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01],  // 3

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01],  // 4

                                [0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 5

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 6

                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 7

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01],  // 8

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01],  // 9

                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]   // 10

                            ]
                        }
                    ],
                    tileActions: function() {
                        var actionsList = [];
                                               
                        actionsList[128] = function(actionSelected) {
                            actionSelected.tells.push("A spray of lava splashes on the party!");

                            angular.forEach(actionSelected.party, function(player, key) {
                                var message = "";
                                var damage = diceService.roll(1,10);
                                var savingthrow = diceService.roll(1,20);
                                if (savingthrow < 15) {
                                    player.health = player.health - damage;

                                    message = infoText.auraDamage
                                        .replace(/PLAYER/, player.name)
                                        .replace(/DAMAGE/, damage)
                                        .replace(/AURA/, "fire damage from the lava");

                                    if (player.health < 1) { 
                                        player.health = 0;
                                        message = message + " and died";
                                    }

                                    actionSelected.tells.push(message);
                                } else {
                                    actionSelected.tells.push(player.name + " avoided the lava.");                                    
                                }
                            });
                        };
                        
                        actionsList[129] = function(actionSelected) {
                            actionSelected.tells.push("A eerie wailing sound comes from down the hallway...");
                        };
                        
                        return actionsList;
                    }
                }
            };

            return gameModules;
        }
    ]);