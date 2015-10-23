/* global angular */
angular
    .module('triskelion.utils.dice.service', [])
    .service('diceService',
        function() {
            'use strict';
            this.roll = function(howmany, sides) {
                var total = 0;
                for (var i = 0; i < howmany; i++) {
                    total += Math.floor(Math.random() * sides) + 1;
                }
                return total;
            };
        }
    );
