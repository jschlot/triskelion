/* global angular, d3 */
angular
    .module('triskelion.mazeRunner.service', [])
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
    ])
    .factory('miniMap', ['tileService',
        function(tileService) {
            'use strict';
            var miniMap = function(map) {
                var vis = d3.select("#mazeRunner")
                    .attr("viewBox", "0 0 500 300");

                vis.selectAll("*").remove();

                var width = map[0].length;
                var height = map.length;
                var canvas = { width: 500, height: 300 };

                var scaleX = d3.scale.linear()
                    .domain([0, width])
                    .range([0, canvas.width]);

                var scaleY = d3.scale.linear()
                    .domain([0, height])
                    .range([0, canvas.height]);

                var cellFactory = function (plotCoords, className, tile) {
                    var isDoor = "";
                    if (tile === 0x26) {
                        isDoor = "ns-unlocked";
                    } else if (tile === 0x25) {
                        isDoor = "ew-unlocked";
                    } else if (tile === 0x5) {
                        isDoor = "ns-locked";
                    } else if (tile === 0x04) {
                        isDoor = "ew-locked";
                    }
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
                        var rectWidth = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? 0.20 : 0.50,
                            rectHeight = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? 0.50 : 0.30,
                            lineCenter = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? rectHeight : 0,
                            lineMid = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? 0 : rectWidth,
                            idxA = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? 1 : 2,
                            idxB = (isDoor === "ew-unlocked" || isDoor === "ew-locked") ? 1 : 0;
                
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
                
                        cell.selectAll("rect." + className + ".door")
                            .data([plotCoords])
                            .enter()
                            .append("svg:rect")
                            .attr("class", className + " door")
                            .attr("fill", function() { 
                                return (isDoor === "ew-unlocked" || isDoor === "ns-unlocked" ) ? "white" : "black"; 
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
    ])
    .factory('mazeRunner', ['tileService',
        function(tileService) {
            'use strict';

            var mazeRunner = function(levelmap) {

                var view = levelmap.reverse();

                var vis = d3.select("#mazeRunner")
                    .attr("viewBox", "0 0 500 300");

                vis.selectAll("*").remove();

                var scaleX = d3.scale.linear();
                var scaleY = d3.scale.linear();

                var wallFactory = function(data, wall) {
                    vis.selectAll("polygon." + wall)
                        .data([data])
                        .enter().append("polygon")
                        .attr("class", wall)
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

                 backgroundLeftEnd = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":220,"y":190}, {"x":220,"y":110} ],

                 backgroundLeftThru = [ {"x":100, "y":110}, {"x":100,"y":190}, {"x":200,"y":190}, {"x":200,"y":110} ],
                 backgroundMidThru = [ {"x":200, "y":110}, {"x":200,"y":190}, {"x":300,"y":190}, {"x":300,"y":110} ],
                 backgroundRightThru = [ {"x":300, "y":110}, {"x":300,"y":190}, {"x":400,"y":190}, {"x":400,"y":110} ],

                 backgroundRightEnd = [ {"x":280, "y":110}, {"x":280,"y":190}, {"x":320,"y":210}, {"x":320,"y":90} ],

                 ceilFront = [ {"x":0, "y":0}, {"x":500,"y":0}, {"x":440,"y":30}, {"x":60,"y":30} ],
                 ceilMid = [ {"x":60, "y":30}, {"x":440,"y":30}, {"x":380,"y":60}, {"x":120,"y":60} ],
                 ceilBack = [ {"x":120, "y":60}, {"x":380,"y":60}, {"x":320,"y":90}, {"x":180,"y":90} ],

                 floorFront = [ {"x":0, "y":300}, {"x":60,"y":270}, {"x":440,"y":270}, {"x":500,"y":300} ],
                 floorMid = [ {"x":60, "y":270}, {"x":120,"y":240}, {"x":380,"y":240}, {"x":440,"y":270} ],
                 floorBack = [ {"x":120, "y":240}, {"x":180,"y":210}, {"x":320,"y":210}, {"x":380,"y":240} ];

                 // depth 4's background goes first as it's the final back wall
                if (tileService.isBlock(view[0][1])) {
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

                // up the middle
                if (view[1] && tileService.isBlock(view[1][1])) {
                    wallFactory(backgroundClosedBack, 'mid-4');
                }

                if (view[2] && tileService.isBlock(view[2][1])) {
                    wallFactory(backgroundClosedMid, 'mid-3');
                }

                if (view[3] && tileService.isBlock(view[3][1])) {
                    wallFactory(backgroundClosedFront, 'mid-2');
                }

            };

            return mazeRunner;
        }
    ]);