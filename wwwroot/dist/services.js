/* global angular */
angular
    .module('triskelion.levelMap.service', [])
    .factory('levelMap', ['tileService',
        function(tileService) {
            'use strict';
            var map = [],
                width = 9,
                height = 9,
                depth = 4;

            var levelMap = {
                init: function(config) {
                    for (var i=0; i < width; i++) {
                        map[i] = new Array(height);
                        for (var j=0; j < height; j++) {
                            if (config[i]) {
                                map[i][j] = config[i][j];
                            } else {
                                map[i][j] = tileService.set.NOTHING;
                            }
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
                    var header = [];
                    header[0] = orientation[0];
                    for (var i=0; i < height; i++) {
                        header.push(i.toString(16).toUpperCase());
                    }
                    console.log(header.join(", "));
                    for (var j=0; j < width; j++) {
                        var row = map[j].join(", ");
                        console.log(j.toString(16).toUpperCase() + ": " + row);
                    }
                },
                debugView: function(view,orientation) {
                    var header = [];
                    header[0] = orientation[0];
                    for (var i=0; i < 3; i++) {
                        header.push(i.toString(16).toUpperCase());
                    }
                    console.log(header.join(", "));
                    for (var j=0; j <= depth; j++) {
                        var row = view[j].join(", ");
                        console.log(j.toString(16).toUpperCase() + ": " + row);
                    }
                },
                getView: function(xCoord,yCoord, orientation) {
                    if (!orientation) { orientation = 'north'; }

                    var currentTile = [];
                    for (var i=0; i <= depth; i++) {
                        currentTile[i] = new Array(3);
                        for (var j=0; j < 3; j++) {
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
                },
                updateTile: function(xCoord, yCoord, tileBit) {
                    map[yCoord][xCoord] = tileBit;
                }
            };

            return levelMap;
        }
    ]);
/* global angular, d3 */
angular
    .module('triskelion.mapModal.service', [])
    .factory('mapModal', [
        function() {
            'use strict';
            var mapModal = function(message) {
                var scaleX = d3.scale.linear();
                var scaleY = d3.scale.linear();

                // requires that the mazerunner has been loaded
                var vis = d3.select("#mazeRunner");
                    vis.selectAll("polygon.modal")
                        .data([[ {"x":200, "y":130}, {"x":200,"y":170}, {"x":300,"y":170}, {"x":300,"y":130} ]])
                        .enter().append("polygon")
                        .attr("class", "modal")
                        .attr("points", function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(",");
                            }).join(" ");
                        });

                    vis.selectAll("text").data([message])
                        .enter()
                        .append("text")
                        .attr("class", "center-label")
                        .attr("x",250)
                        .attr("y",154)
                        .attr("text-anchor","middle")
                        .text(function(d) { return d; });
                return true;
            };
            return mapModal;
        }
    ]);
/* global angular, d3 */
angular
    .module('triskelion.mazeRunner.service', [])
    .factory('mazeRunner', ['tileService',
        function(tileService) {
            'use strict';

            var mazeRunner = function(levelmap) {
                var check;
                var view = levelmap.reverse();

                var vis = d3.select("#mazeRunner")
                    .attr("viewBox", "0 0 500 300");

                vis.selectAll("*").remove();

                var scaleX = d3.scale.linear();
                var scaleY = d3.scale.linear();

                var wallFactory = function(data, className, cellValue) {
                    vis.selectAll("polygon." + className)
                        .data([data])
                        .enter().append("polygon")
                        .attr("class", className)
                        .attr("points",function(d) {
                            return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" ");
                        });
                };

                var doorFactory = function(data, className, cellValue) {
                    vis.selectAll("polygon." + className)
                        .data([data])
                        .enter().append("polygon")
                        .attr("class", className)
                        .attr("points",function(d) {
                            return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" ");
                        });
                };


                var leftFront = [ {"x":0, "y":0}, {"x":0,"y":300}, {"x":60,"y":270}, {"x":60,"y":30} ],
                 leftFrontThru = [ {"x":0, "y":30}, {"x":0,"y":270}, {"x":60,"y":270}, {"x":60,"y":30} ],
                 leftMid = [ {"x":60, "y":30}, {"x":60,"y":270}, {"x":120,"y":240}, {"x":120,"y":60} ],
                 leftMidThru = [ {"x":0, "y":60}, {"x": 0,"y":240}, {"x":120,"y":240}, {"x":120,"y":60} ],
                 leftBack = [ {"x":120, "y":60}, {"x":120,"y":240}, {"x":180,"y":210}, {"x":180,"y":90} ],
                 leftBackThru = [ {"x":60, "y":90}, {"x":60,"y":210}, {"x":180,"y":210}, {"x":180,"y":90} ],

                 rightFront = [ {"x":440, "y":30}, {"x":440,"y":270}, {"x":500,"y":300}, {"x":500,"y":0} ],
                 rightFrontThru = [ {"x":440, "y":30}, {"x":440,"y":270}, {"x":500,"y":270}, {"x":500,"y":30} ],
                 rightMid = [ {"x":380, "y":60}, {"x":380,"y":240}, {"x":440,"y":270}, {"x":440,"y":30} ],
                 rightMidThru = [ {"x":380, "y":60}, {"x":380,"y":240}, {"x":500,"y":240}, {"x":500,"y":60} ],
                 rightBack = [ {"x":320, "y":90}, {"x":320,"y":210}, {"x":380,"y":240}, {"x":380,"y":60} ],
                 rightBackThru = [ {"x":320, "y":90}, {"x":320,"y":210}, {"x":440,"y":210}, {"x":440,"y":90} ],

                 backgroundClosedBack = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":320,"y":210}, {"x":320,"y":90} ],
                 backgroundClosedMid = [ {"x":120, "y":60}, {"x":120,"y":240}, {"x":380,"y":240}, {"x":380,"y":60} ],
                 backgroundClosedFront = [ {"x":60, "y":30}, {"x":60,"y":270}, {"x":440,"y":270}, {"x":440,"y":30} ],
                 
                 backgroundDoorBack = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":200,"y":210}, {"x":200,"y":110}, {"x":300,"y":110}, {"x":300,"y":210}, {"x":320,"y":210}, {"x":320,"y":90} ],
                 backgroundDoorMid = [{"x":120, "y":60}, {"x":120,"y":240}, {"x":160,"y":240}, {"x":160,"y":90}, {"x":340,"y":90}, {"x":340,"y":240}, {"x":380,"y":240}, {"x":380,"y":60}],
                 backgroundDoorFront = [ {"x":60, "y":30}, {"x":60,"y":270}, {"x":120,"y":270}, {"x":120,"y":60}, {"x":380,"y":60}, {"x":380,"y":270}, {"x":440,"y":270}, {"x":440,"y":30} ],

                 backgroundLeftEnd = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":220,"y":190}, {"x":220,"y":110} ],
                 backgroundLeftThru = [ {"x":100, "y":110}, {"x":100,"y":190}, {"x":200,"y":190}, {"x":200,"y":110} ],
                 backgroundMidThru = [ {"x":200, "y":110}, {"x":200,"y":190}, {"x":300,"y":190}, {"x":300,"y":110} ],

                 backgroundRightThru = [ {"x":300, "y":110}, {"x":300,"y":190}, {"x":400,"y":190}, {"x":400,"y":110} ],
                 backgroundRightEnd = [ {"x":280, "y":110}, {"x":280,"y":190}, {"x":320,"y":210}, {"x":320,"y":90} ];

/*
                 backgroundMidDoor = [ {"x":200, "y":110}, {"x":200,"y":190}, {"x":230, "y":190}, {"x":230,"y":120}, {"x":270, "y":120}, {"x":270,"y":190}, {"x":300,"y":190}, {"x":300,"y":110} ],
                 ceilFront = [ {"x":0, "y":0}, {"x":500,"y":0}, {"x":440,"y":30}, {"x":60,"y":30} ],
                 ceilMid = [ {"x":60, "y":30}, {"x":440,"y":30}, {"x":380,"y":60}, {"x":120,"y":60} ],
                 ceilBack = [ {"x":120, "y":60}, {"x":380,"y":60}, {"x":320,"y":90}, {"x":180,"y":90} ],

                 floorFront = [ {"x":0, "y":300}, {"x":60,"y":270}, {"x":440,"y":270}, {"x":500,"y":300} ],
                 floorMid = [ {"x":60, "y":270}, {"x":120,"y":240}, {"x":380,"y":240}, {"x":440,"y":270} ],
                 floorBack = [ {"x":120, "y":240}, {"x":180,"y":210}, {"x":320,"y":210}, {"x":380,"y":240} ];
*/
                 

                 // depth 4's background goes first as it's the final back wall, 
                 // also we skip the door since the back wall is sort of a hack
                if (tileService.isBlock(view[0][1]) || tileService.isDoor(view[0][1])) {
                   wallFactory(backgroundMidThru, 'mid-5');
                }

                // right side
                if (view[0] && tileService.isBlock(view[0][0])) {
                    wallFactory(backgroundRightThru, "right-5");
                }

                if (view[1] && tileService.isBlock(view[1][0])) {
                    wallFactory(backgroundRightEnd, 'right-4b');
                    wallFactory(rightBackThru, 'right-4a');
                }

                if (view[2] && tileService.isBlock(view[2][0])) {
                    wallFactory(rightBack, 'right-3b');
                    wallFactory(rightMidThru, 'right-3a');
                }

                if (view[3] && tileService.isBlock(view[3][0])) {
                    wallFactory(rightMid, 'right-2b');
                    wallFactory(rightFrontThru, 'right-2a');
                }

                if (view[4] && tileService.isBlock(view[4][0])) {
                    wallFactory(rightFront, 'right-1');
                }

                // left side
                if (view[0] && tileService.isBlock(view[0][2])) {
                    wallFactory(backgroundLeftThru, "left-5");
                }

                if (view[1] && tileService.isBlock(view[1][2])) {
                    wallFactory(backgroundLeftEnd, 'left-4b');
                    wallFactory(leftBackThru, 'left-4a');
                }

                if (view[2] && tileService.isBlock(view[2][2])) {
                    wallFactory(leftBack, 'left-3b');
                    wallFactory(leftMidThru, 'left-3a');
                }

                if (view[3] && tileService.isBlock(view[3][2])) {
                    wallFactory(leftMid, 'left-2b');
                    wallFactory(leftFrontThru, 'left-2a');
                }

                if (view[4] && tileService.isBlock(view[4][2])) {
                    wallFactory(leftFront, 'left-1');
                }

                // up the middle, always skip the 4th tile because we assume it's empty cuz you're standing in it

                if (view[1]) {
                    if (tileService.isBlock(view[1][1])) {
                        wallFactory(backgroundClosedBack, 'mid-4');
                    }
                    check = tileService.isDoor(view[1][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch' ) {
                            wallFactory(backgroundClosedBack, 'mid-4');
                        }                       
                        doorFactory(backgroundDoorBack, 'mid-door-4');
                    }
                }

                if (view[2]) { 
                    if (tileService.isBlock(view[2][1])) {
                        wallFactory(backgroundClosedMid, 'mid-3');
                    }
                    check = tileService.isDoor(view[2][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch' ) {
                            wallFactory(backgroundClosedMid, 'mid-3');
                        }                       
                        doorFactory(backgroundDoorMid, 'mid-door-3');
                    }
                }

                if (view[3]) {
                    if (tileService.isBlock(view[3][1])) {
                        wallFactory(backgroundClosedFront, 'mid-2');
                    }
                    check = tileService.isDoor(view[3][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch' ) {
                            wallFactory(backgroundClosedFront, 'mid-2');
                        }                       
                        doorFactory(backgroundDoorFront, 'mid-door-2');
                    }
                }

            };

            return mazeRunner;
        }
    ]);
/* global angular, d3 */
angular
    .module('triskelion.miniMap.service', [])
    .factory('miniMap', ['tileService',
        function(tileService) {
            'use strict';
            var miniMap = function(map) {
                var vis = d3.select("#minimap")
                    .attr("viewBox", "0 0 940 570");

                vis.selectAll("*").remove();

                var width = map[0].length;
                var height = map.length;
                var canvas = { width: 940, height: 570 };

                var scaleX = d3.scale.linear()
                    .domain([0, width])
                    .range([0, canvas.width]);

                var scaleY = d3.scale.linear()
                    .domain([0, height])
                    .range([0, canvas.height]);

                var cellFactory = function (plotCoords, className, tile) {
                    var isDoor = tileService.isDoor(tile);
                    var fill = tileService.mapClass(tile);
                    var cell = vis.append("svg:g")
                        .attr("class", className);
        
                    cell.selectAll("polygon." + className)
                        .data([plotCoords])
                        .enter().append("polygon")
                        .attr("class", className)
                        .attr("class", fill)
                        .attr("points", function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(",");
                            }).join(" ");
                        });
                    
                    if (isDoor) {
                        var dir = isDoor.substr(0,2);
                        var doorType = isDoor.substr(3, isDoor.length);
                        var rectWidth = (dir === "ew") ? 0.20 : 0.50,
                            rectHeight = (dir === "ew") ? 0.50 : 0.20,
                            lineCenter = (dir === "ew") ? rectHeight : 0,
                            lineMid = (dir === "ew") ? 0 : rectWidth,
                            idxA = (dir === "ew") ? 1 : 2,
                            idxB = (dir === "ew") ? 1 : 0;
                
                        cell.selectAll("line." + className)
                            .data([plotCoords])
                            .enter()
                            .append("svg:line")
                            .attr("class", className)
                //        	.attr("stroke-dasharray", "5,5") // portcullis
                            .attr("x1", function(d, i) { return scaleX(d[0].x + lineCenter); })
                            .attr("y1", function(d, i) { return scaleY(d[0].y + lineMid); })
                            .attr("x2", function(d, i) { return scaleX(d[idxA].x + lineCenter); })
                            .attr("y2", function(d, i) { return scaleY(d[idxB].y + lineMid); });
                
                        var xPadding = (1 - rectWidth)/2,
                        yPadding = (1 - rectHeight)/2;
                
                        cell.selectAll("rect." + className + "." + doorType)
                            .data([plotCoords])
                            .enter()
                            .append("svg:rect")
                            .attr("class", className + " " + doorType)
                            .attr("fill", function() { 
                                return (doorType === "unlocked" || doorType === "arch" ) ? "white" : "black"; 
                            })
                            .attr("x", function(d, i) { return scaleX(d[0].x) + scaleX(xPadding); })
                            .attr("y", function(d, i) { return scaleY(d[0].y) + scaleY(yPadding); })
                            .attr("width", scaleX(rectWidth))
                            .attr("height", scaleY(rectHeight));
                    }
                };

                for (var i = 0; i < width; i++) {
                    var topleft = i,
                        botleft = i,
                        botright = 1 + i,
                        toprright = 1 + i;

                    for (var j = 0; j < height; j++) {
                        var yOffset = j,
                            yBotOffset = 1 + j;
                        var plot = [
                            { "x": topleft, "y": yOffset },
                            { "x": botleft, "y": yBotOffset },
                            { "x": botright, "y": yBotOffset },
                            { "x": toprright, "y": yOffset }
                        ];

                        cellFactory(plot, "c-" + i + "-" + j, map[j][i]);
                    }
                }
            };

            return miniMap;
        }
    ]);
/* global angular */
angular
    .module('triskelion.utils.actionDispatcher.service', [])
    .service('actionDispatcher',
        function() {
            'use strict';
            var actionDispatcher = function(transformationFn, value) {
                return (transformationFn || angular.identity)(value);
            };
            return actionDispatcher;
        }
    );
/* global angular */
angular
    .module('triskelion.utils.aiSpeech.service', [])
    .service('actionNotFound', [ 'sarcasticQuips',
        function(sarcasticQuips) {
            'use strict';
            var actionNotFound = function() {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticQuips.length);

                return sarcasticQuips[i];
            };
            return actionNotFound;
        }
    ])
    .service('ouchHappened', [ 'sarcasticOuches',
        function(sarcasticOuches) {
            'use strict';
            var ouchHappened = function() {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticOuches.length);

                return sarcasticOuches[i];
            };
            return ouchHappened;
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.dice.service', [])
    .service('diceService',
        function() {
            'use strict';
            var diceService = {
				roll: function(howmany, sides) {
					var total = 0;
					for (var i = 0; i < howmany; i++) {
						total += Math.floor(Math.random() * sides) + 1;
					}
                    return total;
				}
            };
            
            return diceService;
        }
    );
/* global angular */
angular
    .module('triskelion.utils.dictionary.service', [])
    .service('partyActions',
        function() {
            'use strict';
            var partyActions = {
                forward: {
                    name: "Forward",
                    hotkey: "F",
                    _self: "forward"
                },
                goleft: {
                    name: "Left",
                    hotkey: "L",
                    _self: "left"
                },
                goright: {
                    name: "Right",
                    hotkey: "R",
                    _self: "right"
                },
                camp: {
                    name: "Camp",
                    hotkey: "C",
                    _self: "camp"
                },
                describe: {
                    name: "Describe",
                    hotkey: "D",
                    _self: "describe"
                },
                map: {
                    name: "Map",
                    hotkey: "M",
                    _self: "map"
                },
                returntogame: {
                    name: "Return to Game",
                    hotkey: "R",
                    _self: "returntogame"
                }
            };

            return partyActions;
        }
    )
    .service('partySelectActions',
        function() {
            'use strict';
            var partySelectActions = {
                add: {
                    name: "Add Party Member",
                    hotkey: "A",
                    _self: "add"
                },
                remove: {
                    name: "Remove Party Member",
                    hotkey: "R",
                    _self: "remove"
                },
                back: {
                    name: "Back",
                    hotkey: "B",
                    _self: "back"
                },
                backtoselect: {
                    name: "Back To Select",
                    hotkey: "B",
                    _self: "backtoselect"
                },
                confirmAdd: {
                    name: "Confirm",
                    hotkey: "C",
                    _self: "confirmAdd"
                },
                start: {
                    name: "Start Game",
                    hotkey: "S",
                    _self: "start"
                },
                quit: {
                    name: "Quit Game",
                    hotkey: "Q",
                    _self: "quit"
                }
            };

            return partySelectActions;
        }
    )
    .service('infoText',
        function() {
            'use strict';
            var infoText = {
                startscreen: "Welcome to Triskelion.",
                choosemodule: "To begin, choose an adventure",
                mapscreen: "Map",
                actionchoice: "You chose STRING",
                auraDamage: "PLAYER takes DAMAGE points of damage from AURA",
                partyselect: "Party Select",
                removePlayer: "Who will you ask to leave the party?",
                whowilljoin: "Who will you add to the party?",
                whowillleave: "Who will you remove to the party?",
                closeminimap: "R)eturn to Game",
                campingislovely: "Your team kicks it's collective shoes off, leans back, and smokes the halfling leaf for 2 turns...",
                deathNote: "PLAYER dies",
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
    )
    .service('abilityText',
        function() {
            'use strict';
            var abilityText = {
                auraDamage: "PLAYER takes DAMAGE points of damage from AURA",
                deathNote: "PLAYER dies",
            };

            return abilityText;
        }
    )
    .service('sarcasticQuips',
        function() {
            'use strict';
            var sarcasticQuips = [
                "Huh? What was that?",
                "I don't get it.",
                "Whatever did you mean?",
                "Hmmm, I don't think you typed that right.",
                "I didn't recognize your request."
            ];

            return sarcasticQuips;
        }
    )
    .service('sarcasticOuches',
        function() {
            'use strict';
            var sarcasticOuches = [
                "Ouch!",
                "Thwack!"
            ];

            return sarcasticOuches;
        }
    );

/* global angular */
angular
    .module('triskelion.utils.dungeon.service', [])
    .service('gameModules',
        function() {
            'use strict';
            var gameModules = {
                dungeon: {
                    name: "Dungeon of Grim Souls",
                    hotkey: "D",
                    _self: "dungeon",
                    maxparty: 3,
                    mapRows: 12, // offset by 1
                    mapCols: 11, // offset by 1
                    defaultCompassDirection: 'west',
                    startingCoordinates: [4,4], // [ X, Y ]
                    map: [
                        {
                            name: "The Catacombs",
                            layout: [
                                // 0     1     2     3     4     5     6     7     8     9    10    11
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0

                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1

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
                        }
                    ],
                    tileAction: {
                        "action_33": [
                            {
                                tell: "You feel a sense of dread up ahead"
                            }
                        ],
                        "action_50": [
                            {
                                tell: "A ray of light shines upon your group. " +
                                      "Your party is granted [ healing ] for 5 turns by [ spirit of hopefulness ]",
                                type: "BUFF", aura: "healing", turns: 5, remaining: 5, amount: 20
                            }
                        ],
                        "action_51": [
                            {
                                tell: "A spike trap explodes, sending needles flying into the air. " +
                                      " Your party will [ bleed ] for 4 turns by [ needle trap ].",
                                type: "DEBUFF", aura: "bleed", turns: 2, remaining: 2, amount: 1
                            }
                        ]
                    }
                }
            };

            return gameModules;
        }
    );
/* global angular */
angular
    .module('triskelion.utils.globalData.service', [])
    .service('userData', ['gameModules',
        function(gameModules) {
            'use strict';
            var userData = {
                gameModuleSelected: gameModules.dungeon,
                currentMapLevel: 0
            };
            return userData;
        }
    ])
    .service('partyData', ['playerDB', 'userData',
        function(playerDB, userData) {
            'use strict';
            var partyData = playerDB[userData.gameModuleSelected._self].slice(0,2);
            return partyData;
        }
    ])
    .service('tellsList', [
        function() {
            'use strict';
            var tellsList = [];
            return tellsList;
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.npc.service', [])
    .service('npcabilities',
        function() {
            'use strict';
            var npcabilities = {
                'dungeon': {
                    swing: {
                        name: "Swing",
                        hotkey: "S",
                        description: "",
                        _self: "swing"
                    },
                    block: {
                        name: "Block Attack",
                        hotkey: "B",
                        description: "",
                        _self: "block"
                    },
                    taunt: {
                        name: "Taunt Enemies",
                        hotkey: "T",
                        description: "",
                        _self: "taunt"
                    },
                    fireball: {
                        name: "Fireball Volley",
                        hotkey: "F",
                        description: "",
                        _self: "fireball"
                    },
                    dragonblast: {
                        name: "Dragon Blast",
                        hotkey: "D",
                        description: "",
                        _self: "dragonblast"
                    },
                    inferno: {
                        name: "Inferno Strike",
                        hotkey: "I",
                        description: "",
                        _self: "inferno"
                    },
                    quickheal: {
                        name: "Quick Heal",
                        hotkey: "q",
                        description: "",
                        _self: "quickheal"
                    },
                    bubble: {
                        name: "Bubble Shield",
                        hotkey: "B",
                        description: "",
                        _self: "bubble"
                    },
                    radiate: {
                        name: "Radiate Livelihood",
                        hotkey: "R",
                        description: "",
                        _self: "radiate"
                    },
                    shoot: {
                        name: "Shoot Arrow",
                        hotkey: "S",
                        description: "",
                        _self: "shoot"
                    },
                    powershot: {
                        name: "Power Shot",
                        hotkey: "P",
                        description: "",
                        _self: "powershot"
                    },
                    flurry: {
                        name: "Furry of Arrows",
                        hotkey: "F",
                        description: "",
                        _self: "flurry"
                    },
                    pummel: {
                        name: "Pummel",
                        hotkey: "p",
                        description: "",
                        _self: "pummel"
                    },
                    whirlwind: {
                        name: "Whirlwind",
                        hotkey: "w",
                        description: "",
                        _self: "whirlwind"
                    },
                    smash: {
                        name: "Smashing Blow",
                        hotkey: "s",
                        description: "",
                        _self: "smash"
                    }
                }
            };

            return npcabilities;
        }
    )
    .service('npcraces',
        function() {
            'use strict';
            var npcraces = {
                'dungeon': {
                    human: {
                        name: "Human",
                        hotkey: "H",
                        _self: "human"
                    },
                    elf: {
                        name: "Elf",
                        hotkey: "e",
                        _self: "elf"
                    },
                    dwarf: {
                        name: "Dwarf",
                        hotkey: "D",
                        _self: "dwarf"
                    }
                }
            };

            return npcraces;
        }
    )
    .service('npctypes',
        function() {
            'use strict';
            var npctypes = {
                'dungeon': {
                    support: {
                        name: "Healer",
                        hotkey: "H",
                        _self: "support"
                    },
                    fighter: {
                        name: "Fighter",
                        hotkey: "F",
                        _self: "fighter"
                    },
                    caster: {
                        name: "Mage",
                        hotkey: "M",
                        _self: "caster"
                    },
                    thief: {
                        name: "Thief",
                        hotkey: "T",
                        _self: "thief"
                    },
                    archer: {
                        name: "Ranger",
                        hotkey: "R",
                        _self: "archer"
                    }
                }
            };

            return npctypes;
        }
    )
    .service('playerDB',['npcabilities', 'npcraces', 'npctypes',
        function(npcabilities,npcraces,npctypes) {
            'use strict';
            var playerDB = {
                'dungeon': [
                    {
                        name: "Gregor Mandalor",
                        hotkey: "G",
                        _self: "gregor",
                        health: 200,
                        status: "Alive",
                        type: npctypes.dungeon.fighter.name,
                        race: npcraces.dungeon.human.name,
                        abilities: [
                            npcabilities.dungeon.swing,
                            npcabilities.dungeon.block,
                            npcabilities.dungeon.taunt
                        ]
                    },
                    {
                        name: "Devonellah",
                        hotkey: "D",
                        _self: "devonellah",
                        health: 80,
                        status: "Alive",
                        type: npctypes.dungeon.support.name,
                        race: npcraces.dungeon.elf.name,
                        abilities: [
                            npcabilities.dungeon.quickheal,
                            npcabilities.dungeon.bubble,
                            npcabilities.dungeon.radiate
                        ]
                    },
                    {
                        name: "Jupiterra",
                        hotkey: "J",
                        _self: "jupiterra",
                        health: 100,
                        status: "Alive",
                        type: npctypes.dungeon.archer.name,
                        race: npcraces.dungeon.elf.name,
                        abilities: [
                            npcabilities.dungeon.shoot,
                            npcabilities.dungeon.powershot,
                            npcabilities.dungeon.flurry
                        ]
                    },
                    {
                        name: "Thermofax Magipoor",
                        hotkey: "T",
                        _self: "thermofax",
                        health: 80,
                        status: "Alive",
                        type: npctypes.dungeon.caster.name,
                        race: npcraces.dungeon.human.name,
                        abilities: [
                            npcabilities.dungeon.fireball,
                            npcabilities.dungeon.dragonblast,
                            npcabilities.dungeon.inferno
                        ]
                    },
                    {
                        name: "Krayt Stoneleg",
                        hotkey: "K",
                        _self: "krayt",
                        health: 120,
                        status: "Alive",
                        type: npctypes.dungeon.thief.name,
                        race: npcraces.dungeon.dwarf.name,
                        abilities: [
                            npcabilities.dungeon.pummel,
                            npcabilities.dungeon.smash,
                            npcabilities.dungeon.whirlwind
                        ]
                    }
                ]
            };

            return playerDB;
        }]
    );
    
/* global angular */
angular
    .module('triskelion.utils.stringManipulations.service', [])
    .factory('objectFindByKey',
        function() {
            'use strict';
            var objectFindByKey = function(array, key, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key].toLowerCase() === value.toLowerCase()) {
                        return array[i];
                    }
                }
                return null;
            };
            return objectFindByKey;
        }
    )
    .factory('hotkeyAction',
        function() {
            'use strict';
            var hotkeyAction = function(action) {
                var hotkey = action.hotkey;

                if (action.name) {
                    var remainder = action.name.substr(1,action.name.length);
                    return hotkey + ")" + remainder;
                } else {
                    return null;
                }

            };
            return hotkeyAction;
        }
    );
/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .factory('tileService',
        function() {
            'use strict';

            var tileService = {
                isBlock: function(tile) {
                    return (tile < 18) ? true : false;
                },
                isDoor: function(tile) {
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
                },
                canGoForward: function(tile) {
                    return (tile > 23) ? true : false;
                },
                mapClass: function(tile) {
                    var mapClass = 'wall';
                    if (tile > 23) {
                        mapClass = 'floor';
                    } else if (tile === 4) {
                        mapClass = 'floor';                        
                    } else if (tile === 5) {
                        mapClass = 'floor';                        
                    }

                    return mapClass;
                },
                set: {
                    'NOTHING': 0x00
                }
            };
            return tileService;
        }
    );