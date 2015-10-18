/* global angular, d3 */
angular
    .module('triskelion.mazeRunner.service', [])
    .service('mazeRunner', ['tileService',
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