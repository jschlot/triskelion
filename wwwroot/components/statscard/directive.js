/* global angular */
angular
    .module('triskelion.statsCard.directive',[])
    .directive('statsCardDirective', [
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
                character: "="
            },
            templateUrl: 'components/statscard/partial.html',
            link: linkingFunction
          };
    }]);