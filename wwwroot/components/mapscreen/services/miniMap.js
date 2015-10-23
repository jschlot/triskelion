/* global angular, d3 */
angular
    .module('triskelion.mapscreen.miniMap.service', [])
    .service('miniMap', ['tileService',
        function (tileService) {
            'use strict';
            var miniMap = function (map) {
                var vis,
                    width = map[0].length, // BUG
                    height = map.length,
                    canvas = {width: 940, height: 570},
                    scaleX,
                    scaleY,
                    cellFactory,
                    topleft,
                    botleft,
                    botright,
                    toprright,
                    yOffset,
                    yBotOffset,
                    plot;

                vis = d3.select('#minimap')
                        .attr('viewBox', '0 0 940 570');

                vis.selectAll('*').remove();

                scaleX = d3.scale.linear()
                        .domain([0, width])
                        .range([0, canvas.width]);

                scaleY = d3.scale.linear()
                        .domain([0, height])
                        .range([0, canvas.height]);

                cellFactory = function (plotCoords, className, tile) {
                    var isDoor = tileService.isDoor(tile),
                        fill = tileService.mapClass(tile),
                        xPadding,
                        yPadding,
                        cell,
                        dir,
                        doorType,
                        rectWidth,
                        rectHeight,
                        lineCenter,
                        lineMid,
                        idxA,
                        idxB;

                    cell = vis.append('svg:g')
                            .attr('class', className);

                    cell.selectAll('polygon.' + className)
                        .data([plotCoords])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('class', fill)
                        .attr('points', function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(',');
                            }).join(' ');
                        });

                    if (isDoor) {
                        dir = isDoor.substr(0,2);
                        rectWidth = (dir === 'ew') ? 0.20 : 0.50;
                        rectHeight = (dir === 'ew') ? 0.50 : 0.20;
                        lineCenter = (dir === 'ew') ? rectHeight : 0;
                        lineMid = (dir === 'ew') ? 0 : rectWidth;
                        idxA = (dir === 'ew') ? 1 : 2;
                        idxB = (dir === 'ew') ? 1 : 0;
                        doorType = isDoor.substr(3, isDoor.length);
                        xPadding = (1 - rectWidth) / 2;
                        yPadding = (1 - rectHeight) / 2;


                        cell.selectAll('line.' + className)
                            .data([plotCoords])
                            .enter()
                            .append('svg:line')
                            .attr('class', className)
                            .attr('x1', function (d, i) {
                                return scaleX(d[0].x + lineCenter);
                            })
                            .attr('y1', function (d, i) {
                                return scaleY(d[0].y + lineMid);
                            })
                            .attr('x2', function (d, i) {
                                return scaleX(d[idxA].x + lineCenter);
                            })
                            .attr('y2', function (d, i) {
                                return scaleY(d[idxB].y + lineMid);
                            });


                        cell.selectAll('rect.' + className + '.' + doorType)
                            .data([plotCoords])
                            .enter()
                            .append('svg:rect')
                            .attr('class', className + ' ' + doorType)
                            .attr('fill', function () {
                                return (doorType === 'unlocked' || doorType === 'arch') ? 'white' : 'black';
                            })
                            .attr('x', function (d, i) {
                                return scaleX(d[0].x) + scaleX(xPadding);
                            })
                            .attr('y', function (d, i) {
                                return scaleY(d[0].y) + scaleY(yPadding);
                            })
                            .attr('width', scaleX(rectWidth))
                            .attr('height', scaleY(rectHeight));
                    }
                };

                for (var i = 0; i < width; i++) {
                    topleft = i;
                    botleft = i;
                    botright = i + 1;
                    toprright = i + 1;

                    for (var j = 0; j < height; j++) {
                        yOffset = j;
                        yBotOffset = 1 + j;
                        plot = [
                            {'x': topleft, 'y': yOffset},
                            {'x': botleft, 'y': yBotOffset},
                            {'x': botright, 'y': yBotOffset},
                            {'x': toprright, 'y': yOffset}
                        ];

                        cellFactory(plot, 'c-' + i + '-' + j, map[j][i]);
                    }
                }
            };

            return miniMap;
        }
    ]);
