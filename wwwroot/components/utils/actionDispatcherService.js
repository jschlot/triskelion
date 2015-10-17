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