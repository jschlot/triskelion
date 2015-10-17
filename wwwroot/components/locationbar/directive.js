/* global angular */
angular
    .module('triskelion.locationBar.directive',[])
    .directive('locationBarDirective', [
        function(){
          'use strict';

          function linkingFunction(scope, element){
            scope.element = element;
          }

          function controller($scope){

            $scope.$on('$destroy', function(){
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
                map: "="
            },
            templateUrl: 'components/locationbar/partial.html',
            link: linkingFunction
          };
    }]);