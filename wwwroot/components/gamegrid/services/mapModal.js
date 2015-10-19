/* global angular, d3 */
angular
    .module('triskelion.gamegrid.mapModal.service', [])
    .service('mapModal', [
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