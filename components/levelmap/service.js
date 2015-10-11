angular
    .module('triskelion.levelMap.service', [])
    .factory('levelMap', [
        function() {
            'use strict';
            /*
                // TILE BITS
                0x00    INACCESSIBLE
                0x01    WALL
                0x02    VISIBLE AREA
                0x03    VISIBLE DOOR
                0x04    HIDDEN DOOR
                0x05    MAGICAL DARKNESS
                0x06    MAGICAL SEAL
                0x07    UP STAIRS
                0x08    DOWN STAIRS
                0x09    PORTAL
                0x0A    PITFALL
                0x0B    CHUTE
                0x0C    ROTATING FLOOR
                0x0D    MESSAGE
                0x0E    GUARDIAN
                0x0F    SPECIAL EVENT
                0x10    TELEPORT START
                0x11    TELEPORT END
                0x12    COMMENT
                0x13    LOOT
                0X14    UNEXPLORED AREA
            */
            var map = [],
                width = 9,
                height = 9,
                depth = 1;

            var levelMap = {
                init: function() {
                    for (var i=0; i < width; i++) {
                        map[i] = new Array(height);
                        for (var j=0; j < height; j++) {
                            map[i][j] = 0x00;
                        }
                    }
                },
                setDimensions: function(w, h) {
                    width = w;
                    height = h;
                },
                setDepth: function(d) {
                    depth = d;
                },
                getMap: function() {
                    return map;
                },
                debugMap: function(orientation) {
                    var header = []
                    header[0] = orientation[0];
                    for (var i=0; i < height; i++) {
                        header.push(i.toString(16).toUpperCase());
                    }
                    console.log(header.join(", "));
                    for (var i=0; i < width; i++) {
                        var row = map[i].join(", ");
                        console.log(i.toString(16).toUpperCase() + ": " + row);
                    }
                },
                debugView: function(view,orientation) {
                    var header = []
                    header[0] = orientation[0];
                    for (var i=0; i < 3; i++) {
                        header.push(i.toString(16).toUpperCase());
                    }
                    console.log(header.join(", "));
                    for (var i=0; i <= depth; i++) {
                        var row = view[i].join(", ");
                        console.log(i.toString(16).toUpperCase() + ": " + row);
                    }
                },
                getView: function(xCoord,yCoord, orientation) {
                    if (!orientation) { orientation = 'north'; }

                    var currentTile = [];
                    for (var i=0; i <= depth; i++) {
                        currentTile[i] = new Array(3);
                        for (var j=0; j < 3; j++) {
                            currentTile[i][j] = 0x00;
                        }
                        switch (orientation) {
                            case 'north':
                                if (map[yCoord - i]) {
                                    currentTile[i][0] = (map[yCoord - i][xCoord - 1]) ? map[yCoord - i][xCoord - 1] : 0x00;
                                    currentTile[i][1] = (map[yCoord - i][xCoord]) ? map[yCoord - i][xCoord] : 0x00;
                                    currentTile[i][2] = (map[yCoord - i][xCoord + 1]) ? map[yCoord - i][xCoord + 1] : 0x00;
                                }
                                break;
                            case 'south':
                                if (map[yCoord + i]) {
                                    currentTile[i][0] = (map[yCoord + i][xCoord - 1]) ? map[yCoord + i][xCoord - 1] : 0x00;
                                    currentTile[i][1] = (map[yCoord + i][xCoord]) ? map[yCoord + i][xCoord] : 0x00;
                                    currentTile[i][2] = (map[yCoord + i][xCoord + 1]) ? map[yCoord + i][xCoord + 1] : 0x00;
                                }
                                break;
                            case 'east':
                                if (map[yCoord - 1]) {
                                    currentTile[i][2] = (map[yCoord - 1][xCoord + i]) ? map[yCoord - 1][xCoord + i] : 0x00;
                                }
                                if (map[yCoord]) {
                                    currentTile[i][1] = (map[yCoord][xCoord + i]) ? map[yCoord][xCoord + i] : 0X00;
                                }
                                if (map[yCoord + 1]) {
                                    currentTile[i][0] = (map[yCoord + 1][xCoord + i]) ? map[yCoord + 1][xCoord + i] : 0x00;
                                }
                                break;
                            case 'west':
                                if (map[yCoord - 1]) {
                                    currentTile[i][0] = (map[yCoord - 1][xCoord - i]) ? map[yCoord - 1][xCoord - i] : 0x00;
                                }
                                if (map[yCoord]) {
                                    currentTile[i][1] = (map[yCoord][xCoord - i]) ? map[yCoord][xCoord - i] : 0X00;
                                }
                                if (map[yCoord + 1]) {
                                    currentTile[i][2] = (map[yCoord + 1][xCoord - i]) ? map[yCoord + 1][xCoord - i] : 0x00;
                                }
                                break;
                        }
                    }

                    return currentTile;
                },
                updateNode: function(xCoord, yCoord, tileBit) {
                    map[yCoord][xCoord] = tileBit;
                }
            };

            return levelMap;
        }
    ]);