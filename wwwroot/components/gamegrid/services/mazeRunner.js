/* global angular, d3 */
angular
    .module('triskelion.gamegrid.mazeRunner.service', [])
    .service('mazeRunner', ['tileService',
        function (tileService) {
            'use strict';

            var mazeRunner = function (currentView) {
                var check, wallFactory, doorFactory, coordinates,
                    view = currentView.reverse(),
                    vis = d3.select('#mazeRunner')
                            .attr('viewBox', '0 0 500 300'),
                    scaleX = d3.scale.linear(),
                    scaleY = d3.scale.linear();

                vis.selectAll('*').remove();

                wallFactory = function (data, className) {
                    vis.selectAll('polygon.' + className)
                        .data([data])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('points',function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x),scaleY(d.y)].join(',');
                            }).join(' ');
                        });
                };

                doorFactory = function (data, className) {
                    vis.selectAll('polygon.' + className)
                        .data([data])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('points',function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x),scaleY(d.y)].join(',');
                            }).join(' ');
                        });
                };

                coordinates = {
                    leftFront: [{'x': 0, 'y': 0}, {'x': 0,'y': 300}, {'x': 60,'y': 270}, {'x': 60,'y': 30}],
                    leftFrontThru: [{'x': 0, 'y': 30}, {'x': 0,'y': 270}, {'x': 60,'y': 270}, {'x': 60,'y': 30}],
                    leftMid: [{'x': 60, 'y': 30}, {'x': 60,'y': 270}, {'x': 120,'y': 240}, {'x': 120,'y': 60}],
                    leftMidThru: [{'x': 0, 'y': 60}, {'x': 0,'y': 240}, {'x': 120,'y': 240}, {'x': 120,'y': 60}],
                    leftBack: [{'x': 120, 'y': 60}, {'x': 120,'y': 240}, {'x': 180,'y': 210}, {'x': 180,'y': 90}],
                    leftBackThru: [{'x': 60, 'y': 90}, {'x': 60,'y': 210}, {'x': 180,'y': 210}, {'x': 180,'y': 90}],
                    rightFront: [{'x': 440, 'y': 30}, {'x': 440,'y': 270}, {'x': 500,'y': 300}, {'x': 500,'y': 0}],
                    rightFrontThru: [{'x': 440, 'y': 30}, {'x': 440,'y': 270}, {'x': 500,'y': 270}, {'x': 500,'y': 30}],
                    rightMid: [{'x': 380, 'y': 60}, {'x': 380,'y': 240}, {'x': 440,'y': 270}, {'x': 440,'y': 30}],
                    rightMidThru: [{'x': 380, 'y': 60}, {'x': 380,'y': 240}, {'x': 500,'y': 240}, {'x': 500,'y': 60}],
                    rightBack: [{'x': 320, 'y': 90}, {'x': 320,'y': 210}, {'x': 380,'y': 240}, {'x': 380,'y': 60}],
                    rightBackThru: [{'x': 320, 'y': 90}, {'x': 320,'y': 210}, {'x': 440,'y': 210}, {'x': 440,'y': 90}],

                    backgroundClosedBack: [{'x': 180, 'y': 90}, {'x': 180,'y': 210}, {'x': 320,'y': 210}, {'x': 320,'y': 90}],
                    backgroundClosedMid: [{'x': 120, 'y': 60}, {'x': 120,'y': 240}, {'x': 380,'y': 240}, {'x': 380,'y': 60}],
                    backgroundClosedFront: [{'x': 60, 'y': 30}, {'x': 60,'y': 270}, {'x': 440,'y': 270}, {'x': 440,'y': 30}],
                    backgroundDoorFrontPanel: [{'x': 165, 'y': 75},{'x': 165, 'y': 255},{'x': 335, 'y': 255},{'x': 335, 'y': 75}],
                    backgroundDoorFrontArch: [{'x': 90, 'y': 45}, {'x': 90,'y': 255}, {'x': 165,'y': 255}, {'x': 165,'y': 75}, {'x': 335,'y': 75}, {'x': 335,'y': 255}, {'x': 410,'y': 255}, {'x': 410,'y': 45}],


                    backgroundLeftThru: [{'x': 100, 'y': 110}, {'x': 100,'y': 190}, {'x': 200,'y': 190}, {'x': 200,'y': 110}],
                    backgroundRightThru: [{'x': 300, 'y': 110}, {'x': 300,'y': 190}, {'x': 400,'y': 190}, {'x': 400,'y': 110}],

                    backgroundLeftEnd: [{'x': 180, 'y': 90}, {'x': 180,'y': 210}, {'x': 220,'y': 190}, {'x': 220,'y': 110}],
                    backgroundRightEnd: [{'x': 280, 'y': 110}, {'x': 280,'y': 190}, {'x': 320,'y': 210}, {'x': 320,'y': 90}],

                    backgroundMidThru: [{'x': 200, 'y': 110}, {'x': 200,'y': 190}, {'x': 300,'y': 190}, {'x': 300,'y': 110}],

                    backgroundDoorBackPanel: [{'x': 220, 'y': 120},{'x': 220, 'y': 200},{'x': 280, 'y': 200},{'x': 280, 'y': 120}],
                    backgroundDoorBackArch: [{'x': 200, 'y': 100}, {'x': 200,'y': 200}, {'x': 220,'y': 200}, {'x': 220,'y': 120}, {'x': 280,'y': 120}, {'x': 280,'y': 200}, {'x': 300,'y': 200}, {'x': 300,'y': 100}],

                    backgroundDoorMidPanel: [{'x': 195, 'y': 100},{'x': 195, 'y': 225},{'x': 305, 'y': 225},{'x': 305, 'y': 100}],
                    backgroundDoorMidArch: [{'x': 150, 'y': 75}, {'x': 150,'y': 225}, {'x': 195,'y': 225}, {'x': 195,'y': 100}, {'x': 305,'y': 100}, {'x': 305,'y': 225}, {'x': 350,'y': 225}, {'x': 350,'y': 75}]

                };

                // depth 4's background goes first as it's the final back wall,
                // also we skip the door since the back wall is sort of a hack
                if (tileService.isBlock(view[0][1]) || tileService.isDoor(view[0][1])) {
                    wallFactory(coordinates.backgroundMidThru, 'mid-5');
                }

                // right side
                if (view[0] && tileService.isBlock(view[0][0])) {
                    wallFactory(coordinates.backgroundRightThru, 'right-5');
                }

                if (view[1] && tileService.isBlock(view[1][0])) {
                    wallFactory(coordinates.backgroundRightEnd, 'right-4b');
                    wallFactory(coordinates.rightBackThru, 'right-4a');
                }

                if (view[2] && tileService.isBlock(view[2][0])) {
                    wallFactory(coordinates.rightBack, 'right-3b');
                    wallFactory(coordinates.rightMidThru, 'right-3a');
                }

                if (view[3] && tileService.isBlock(view[3][0])) {
                    wallFactory(coordinates.rightMid, 'right-2b');
                    wallFactory(coordinates.rightFrontThru, 'right-2a');
                }

                if (view[4] && tileService.isBlock(view[4][0])) {
                    wallFactory(coordinates.rightFront, 'right-1');
                }

                // left side
                if (view[0] && tileService.isBlock(view[0][2])) {
                    wallFactory(coordinates.backgroundLeftThru, 'left-5');
                }

                if (view[1] && tileService.isBlock(view[1][2])) {
                    wallFactory(coordinates.backgroundLeftEnd, 'left-4b');
                    wallFactory(coordinates.leftBackThru, 'left-4a');
                }

                if (view[2] && tileService.isBlock(view[2][2])) {
                    wallFactory(coordinates.leftBack, 'left-3b');
                    wallFactory(coordinates.leftMidThru, 'left-3a');
                }

                if (view[3] && tileService.isBlock(view[3][2])) {
                    wallFactory(coordinates.leftMid, 'left-2b');
                    wallFactory(coordinates.leftFrontThru, 'left-2a');
                }

                if (view[4] && tileService.isBlock(view[4][2])) {
                    wallFactory(coordinates.leftFront, 'left-1');
                }

                // up the middle, always skip the 4th tile because we assume it's empty cuz you're standing in it

                if (view[1]) {
                    if (tileService.isBlock(view[1][1])) {
                        wallFactory(coordinates.backgroundLeftEnd, 'left-4b');
                        wallFactory(coordinates.backgroundRightEnd, 'right-4b');
                        wallFactory(coordinates.backgroundClosedBack, 'mid-4');
                    }
                    check = tileService.isDoor(view[1][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorBackPanel, 'mid-4');
                        }
                        doorFactory(coordinates.backgroundDoorBackArch, 'mid-door-4');
                    }
                }

                if (view[2]) {
                    if (tileService.isBlock(view[2][1])) {
                        wallFactory(coordinates.leftBack, 'left-3b');
                        wallFactory(coordinates.rightBack, 'right-3b');
                        wallFactory(coordinates.backgroundClosedMid, 'mid-3');
                    }
                    check = tileService.isDoor(view[2][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorMidPanel, 'mid-3');
                        }
                        doorFactory(coordinates.backgroundDoorMidArch, 'mid-door-3');
                    }
                }

                if (view[3]) {
                    if (tileService.isBlock(view[3][1])) {
                        wallFactory(coordinates.leftMid, 'left-2b');
                        wallFactory(coordinates.rightMid, 'right-2b');
                        wallFactory(coordinates.backgroundClosedFront, 'mid-2');
                    }
                    check = tileService.isDoor(view[3][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorFrontPanel, 'mid-2');
                        }
                        doorFactory(coordinates.backgroundDoorFrontArch, 'mid-door-2');
                    }
                }
            };

            return mazeRunner;
        }
    ]);
