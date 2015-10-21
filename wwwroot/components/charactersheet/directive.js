/* global angular */
angular
    .module('triskelion.characterSheet.directive',[])
    .directive('characterSheetDirective', [
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
            templateUrl: 'components/charactersheet/partial.html',
            link: linkingFunction
          };
    }]);