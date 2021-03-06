/* global angular */
angular
    .module('triskelion.utils.levelMap.service', [])
    .service('levelMap', ['tileService',
        function (tileService) {
            'use strict';
            var map = [],
                width = 9,
                height = 9,
                depth = 4;

            this.init = function (config) {
                for (var i = 0; i < width; i++) {
                    map[i] = new Array(height);
                    for (var j = 0; j < height; j++) {
                        if (config[i]) {
                            map[i][j] = config[i][j];
                        } else {
                            map[i][j] = tileService.set.NOTHING;
                        }
                    }
                }
            };

            this.setDimensions = function (w, h) {
                width = w;
                height = h;
            };

            this.setDepth = function (d) {
                depth = d;
            };

            this.getMap = function () {
                return map;
            };

            this.debugMap = function (orientation) {
                var header = [];
                header[0] = orientation[0];
                for (var i = 0; i < height; i++) {
                    header.push(i.toString(16).toUpperCase());
                }
                console.log(header.join(', '));
                for (var j = 0; j < width; j++) {
                    var row = map[j].join(', ');
                    console.log(j.toString(16).toUpperCase() + ': ' + row);
                }
            };

            this.debugView = function (view, orientation) {
                var header = [];
                header[0] = orientation[0];
                for (var i = 0; i < 3; i++) {
                    header.push(i.toString(16).toUpperCase());
                }
                console.log(header.join(', '));
                for (var j = 0; j <= depth; j++) {
                    var row = view[j].join(', ');
                    console.log(j.toString(16).toUpperCase() + ': ' + row);
                }
            };

            this.getView = function (xCoord, yCoord, orientation) {
                if (!orientation) {
                    orientation = 'north';
                }

                var currentTile = [];
                for (var i = 0; i <= depth; i++) {
                    currentTile[i] = new Array(3);
                    for (var j = 0; j < 3; j++) {
                        currentTile[i][j] = tileService.set.NOTHING;
                    }
                    switch (orientation) {
                        case 'north':
                            if (map[yCoord - i]) {
                                currentTile[i][2] = (map[yCoord - i][xCoord - 1]) ? map[yCoord - i][xCoord - 1] : tileService.set.NOTHING;
                                currentTile[i][1] = (map[yCoord - i][xCoord]) ? map[yCoord - i][xCoord] : tileService.set.NOTHING;
                                currentTile[i][0] = (map[yCoord - i][xCoord + 1]) ? map[yCoord - i][xCoord + 1] : tileService.set.NOTHING;
                            }
                            break;
                        case 'south':
                            if (map[yCoord + i]) {
                                currentTile[i][0] = (map[yCoord + i][xCoord - 1]) ? map[yCoord + i][xCoord - 1] : tileService.set.NOTHING;
                                currentTile[i][1] = (map[yCoord + i][xCoord]) ? map[yCoord + i][xCoord] : tileService.set.NOTHING;
                                currentTile[i][2] = (map[yCoord + i][xCoord + 1]) ? map[yCoord + i][xCoord + 1] : tileService.set.NOTHING;
                            }
                            break;
                        case 'east':
                            if (map[yCoord - 1]) {
                                currentTile[i][2] = (map[yCoord - 1][xCoord + i]) ? map[yCoord - 1][xCoord + i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord]) {
                                currentTile[i][1] = (map[yCoord][xCoord + i]) ? map[yCoord][xCoord + i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord + 1]) {
                                currentTile[i][0] = (map[yCoord + 1][xCoord + i]) ? map[yCoord + 1][xCoord + i] : tileService.set.NOTHING;
                            }
                            break;
                        case 'west':
                            if (map[yCoord - 1]) {
                                currentTile[i][0] = (map[yCoord - 1][xCoord - i]) ? map[yCoord - 1][xCoord - i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord]) {
                                currentTile[i][1] = (map[yCoord][xCoord - i]) ? map[yCoord][xCoord - i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord + 1]) {
                                currentTile[i][2] = (map[yCoord + 1][xCoord - i]) ? map[yCoord + 1][xCoord - i] : tileService.set.NOTHING;
                            }
                            break;
                    }
                }

                return currentTile;
            };

            this.updateTile = function (xCoord, yCoord, tileBit) {
                map[yCoord][xCoord] = tileBit;
            };
        }
    ]);
