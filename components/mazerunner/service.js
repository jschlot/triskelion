angular
    .module('triskelion.mazeRunner.service', [])
    .factory('miniMap', ['tileService',
        function(tileService) {
            'use strict';
            var miniMap = function(map) {
                var vis = d3.select("#mazeRunner");
                vis.selectAll("*").remove()

                var width = map[0].length;
                var height = map.length;
                var canvas = { width: 500, height: 300 };

                var scaleX = d3.scale.linear()
                    .domain([0, width])
                    .range([0, canvas.width]);

                var scaleY = d3.scale.linear()
                    .domain([0, height])
                    .range([0, canvas.height]);

                var cellFactory = function (data, wall, fill) {
                    vis.selectAll("polygon." + wall)
                        .data([data])
                        .enter().append("polygon")
                        .attr("class", wall)
                        .attr("class", fill)
                        .attr("points", function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(",");
                            }).join(" ");
                        });
                    return true;
                };

                for (var i = 0; i < width; i++) {
                    var topleft = i,
                        botleft = i,
                        botright = 1 + i,
                        toprright = 1 + i;

                    for (var j = 0; j < height; j++) {
                        var yOffset = j,
                            yBotOffset = 1 + j,
                            fill = tileService.mapClass(map[j][i]);
                        var plot = [
                            { "x": topleft, "y": yOffset },
                            { "x": botleft, "y": yBotOffset },
                            { "x": botright, "y": yBotOffset },
                            { "x": toprright, "y": yOffset }
                        ];

                        cellFactory(plot, "c-" + i + "-" + j, fill);
                    }
                }
            }

            return miniMap;
        }
    ])
    .factory('mazeRunner', ['tileService',
        function(tileService) {
            'use strict';
            /* ALL POSSIBLE WALLS
            //wallFactory(backgroundMidThru, "background-mid-thru");
            //wallFactory(backgroundLeftThru, "background-left-thru");
            //wallFactory(backgroundRightThru, "background-right-thru");

            //wallFactory(backgroundLeftEnd, "background-left-end");
            //wallFactory(backgroundRightEnd, "background-right-end");

            //wallFactory(leftFront, "left-front");
            //wallFactory(leftFrontThru, "left-front-thru");

            //wallFactory(leftMid, "left-mid");
            //wallFactory(leftMidThru, "left-mid-thru");

            //wallFactory(leftBack, "left-back");
            //wallFactory(leftBackThru, "left-back-thru");

            //wallFactory(rightFront, "right-front");
            //wallFactory(rightFrontThru, "right-front-thru");

            //wallFactory(rightMid, "right-mid");
            //wallFactory(rightMidThru, "right-mid-thru");

            //wallFactory(rightBack, "right-back");
            //wallFactory(rightBackThru, "right-back-thru");

            //wallFactory(backgroundClosedBack, "background-closed-back");
            //wallFactory(backgroundClosedMid, "background-closed-mid");
            //wallFactory(backgroundClosedFront, "background-closed-front");

            //wallFactory(ceilFront, "ceil-front");
            //wallFactory(ceilMid, "ceil-mid");
            //wallFactory(ceilBack, "ceil-back");

            //wallFactory(floorFront, "floor-front");
            //wallFactory(floorMid, "floor-mid");
            //wallFactory(floorBack, "floor-back");

            //textFactory('door');
            */

            var mazeRunner = function(view) {

                var vis = d3.select("#mazeRunner")
                         .attr("width", 500)
                         .attr("height", 300);

                vis.selectAll("*").remove()

                var scaleX = d3.scale.linear();
                var scaleY = d3.scale.linear();

                var wallFactory = function(data, wall) {
                    vis.selectAll("polygon." + wall)
                        .data([data])
                        .enter().append("polygon")
                        .attr("class", wall)
                        .attr("points",function(d) {
                            return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" ");});
                };

                var textFactory = function(message) {
                    vis.selectAll("text").data([message])
                        .enter()
                        .append("text")
                        .attr("class", "center-label")
                        .attr("x",250)
                        .attr("y",154)
                        .attr("text-anchor","middle")
                        .text(function(d) { return d; });
                };

                var leftFront = [ {"x":0, "y":0}, {"x":0,"y":300}, {"x":60,"y":270}, {"x":60,"y":30} ],
                 leftFrontThru = [ {"x":0, "y":30}, {"x":0,"y":270}, {"x":60,"y":270}, {"x":60,"y":30} ],
                 leftMid = [ {"x":60, "y":30}, {"x":60,"y":270}, {"x":120,"y":240}, {"x":120,"y":60} ],
                 leftMidThru = [ {"x":60, "y":60}, {"x":60,"y":240}, {"x":120,"y":240}, {"x":120,"y":60} ],
                 leftBack = [ {"x":120, "y":60}, {"x":120,"y":240}, {"x":180,"y":210}, {"x":180,"y":90} ],
                 leftBackThru = [ {"x":120, "y":90}, {"x":120,"y":210}, {"x":180,"y":210}, {"x":180,"y":90} ],

                 rightFront = [ {"x":440, "y":30}, {"x":440,"y":270}, {"x":500,"y":300}, {"x":500,"y":0} ],
                 rightFrontThru = [ {"x":440, "y":30}, {"x":440,"y":270}, {"x":500,"y":270}, {"x":500,"y":30} ],
                 rightMid = [ {"x":380, "y":60}, {"x":380,"y":240}, {"x":440,"y":270}, {"x":440,"y":30} ],
                 rightMidThru = [ {"x":380, "y":60}, {"x":380,"y":240}, {"x":440,"y":240}, {"x":440,"y":60} ],
                 rightBack = [ {"x":320, "y":90}, {"x":320,"y":210}, {"x":380,"y":240}, {"x":380,"y":60} ],
                 rightBackThru = [ {"x":320, "y":90}, {"x":320,"y":210}, {"x":380,"y":210}, {"x":380,"y":90} ],

                 backgroundClosedBack = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":320,"y":210}, {"x":320,"y":90} ],
                 backgroundClosedMid = [ {"x":120, "y":60}, {"x":120,"y":240}, {"x":380,"y":240}, {"x":380,"y":60} ],
                 backgroundClosedFront = [ {"x":60, "y":30}, {"x":60,"y":270}, {"x":440,"y":270}, {"x":440,"y":30} ],
                 backgroundLeftThru = [ {"x":180, "y":110}, {"x":180,"y":190}, {"x":220,"y":190}, {"x":220,"y":110} ],
                 backgroundLeftEnd = [ {"x":180, "y":90}, {"x":180,"y":210}, {"x":220,"y":190}, {"x":220,"y":110} ],
                 backgroundMidThruWide = [ {"x":180, "y":110}, {"x":180,"y":190}, {"x":320,"y":190}, {"x":320,"y":110} ],
                 backgroundMidThru = [ {"x":220, "y":110}, {"x":220,"y":190}, {"x":280,"y":190}, {"x":280,"y":110} ],
                 backgroundRightThru = [ {"x":280, "y":110}, {"x":280,"y":190}, {"x":320,"y":190}, {"x":320,"y":110} ],
                 backgroundRightEnd = [ {"x":280, "y":110}, {"x":280,"y":190}, {"x":320,"y":210}, {"x":320,"y":90} ],

                 ceilFront = [ {"x":0, "y":0}, {"x":500,"y":0}, {"x":440,"y":30}, {"x":60,"y":30} ],
                 ceilMid = [ {"x":60, "y":30}, {"x":440,"y":30}, {"x":380,"y":60}, {"x":120,"y":60} ],
                 ceilBack = [ {"x":120, "y":60}, {"x":380,"y":60}, {"x":320,"y":90}, {"x":180,"y":90} ],

                 floorFront = [ {"x":0, "y":300}, {"x":60,"y":270}, {"x":440,"y":270}, {"x":500,"y":300} ],
                 floorMid = [ {"x":60, "y":270}, {"x":120,"y":240}, {"x":380,"y":240}, {"x":440,"y":270} ],
                 floorBack = [ {"x":120, "y":240}, {"x":180,"y":210}, {"x":320,"y":210}, {"x":380,"y":240} ];

                var left = function(index, tile) {
                    var closedClassNames = ['left-front', 'left-mid', 'left-back', 'background-left-end','deep-left-end'];
                    var thruClassNames = ['left-front-thru', 'left-mid-thru', 'left-back-thru', 'background-left-thru','deep-left-thru'];
                    var closedCoordinates = [leftFront,leftMid, leftBack, backgroundLeftEnd, backgroundMidThru];
                    var thruCoordinates = [leftFrontThru, leftMidThru, leftBackThru, backgroundLeftThru, backgroundMidThru];

                    if (tileService.isBlock(tile)) {
                        wallFactory(closedCoordinates[index], closedClassNames[index]);
                    } else {
                        wallFactory(thruCoordinates[index], thruClassNames[index]);
                    }
                },
                mid = function(index, tile) {
                    var closedClassNames = [null, 'background-closed-front', 'background-closed-mid', 'background-mid-back', 'background-mid-thru'];
                    var closedCoordinates = [null, backgroundClosedFront, backgroundClosedMid, backgroundClosedBack, backgroundMidThru];

                    if (tileService.isBlock(tile)) {
                        wallFactory(closedCoordinates[index], closedClassNames[index]);
                    }
                },
                right = function(index, tile) {
                    var closedClassNames = ['right-front', 'right-mid', 'right-back', 'background-right-end','deep-right-end'];
                    var thruClassNames = ['right-front-thru', 'right-mid-thru', 'right-back-thru', 'background-right-thru','deep-right-thru'];
                    var closedCoordinates = [rightFront,rightMid, rightBack, backgroundRightEnd, backgroundMidThru];
                    var thruCoordinates = [rightFrontThru, rightMidThru, rightBackThru, backgroundRightThru, backgroundMidThru];

                    if (tileService.isBlock(tile)) {
                        wallFactory(closedCoordinates[index], closedClassNames[index]);
                    } else {
                        wallFactory(thruCoordinates[index], thruClassNames[index]);
                    }
                };

                var r = view.length-1;
                for (var i = 0; i<view.length; i++) {
                    left(i, view[i][2]);
                    right(i, view[i][0]);
                }

                // mid-srcreens always have to go last; first found stops the loop
                for (var i = 0; i<view.length; i++) {
                    mid(i, view[i][1]);
                    if (tileService.isBlock(view[i][1])) {
                        return;
                    }
                }
            };

            return mazeRunner;
        }
    ]);