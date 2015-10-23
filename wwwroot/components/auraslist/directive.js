/* global angular */
angular
    .module('triskelion.aurasList.directive',[])
    .directive('aurasListDirective', [
        function() {
          'use strict';

          function linkingFunction(scope, element) {
            scope.element = element;
          }

          function controller($scope) {

            $scope.$on('$destroy', function() {
              $scope.element = null;
            });
          }

          controller.$inject = ['$scope'];

          return {
            restrict: 'E',
            replace: true,
            transclude: false,
            controller: controller,
            scope: {
              auras: '='
            },
            templateUrl: 'components/auraslist/partial.html',
            link: linkingFunction
          };
        }]);
