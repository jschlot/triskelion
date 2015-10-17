/* global angular */
angular
    .module('triskelion.utils.dice.service', [])
    .factory('DiceService',
        function() {
            'use strict';
            return function() {
				this.roll = function(howmany, sides) {
					var total = 0;
					for (var i = 0; i < howmany; i++) {
						total += Math.floor(Math.random() * sides);
					}
                    return total;
				};
            };
        }
    );