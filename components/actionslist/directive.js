angular
    .module('triskelion.actionsList.directive',[])
    .directive('actionsListDirective', [
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
                tells: '=',
                prompt: '=',
                say: "="
            },
            templateUrl: 'components/actionslist/partial.html',
            link: linkingFunction
          };
    }]);
