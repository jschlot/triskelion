angular
  .module('triskelion.saytell.directive',[])
  .directive('autofocus', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link : function($scope, $element) {
        $timeout(function() {
          $element[0].focus();
        });
      }
    }
  }])
  .directive('saytellDirective', ['objectFindByKey', 'actionNotFound', 'infoText',
      function(objectFindByKey, actionNotFound, infoText){
        'use strict';

        function linkingFunction(scope, element){
          scope.element = element;
        }

        function controller($scope){

          $scope.say = function() {
              var lookup;

              $scope.tells = [];

              if ($scope.prompt) {
                lookup = objectFindByKey($scope.actions, 'hotkey', $scope.prompt.substring(0, 1));
              }

              if (lookup) {
                $scope.callback(lookup);
              } else {
                $scope.tells.push(actionNotFound());
              }

              $scope.prompt = null;

          };

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
              actions: "=",
              callback: "=",
              auto: "@"
          },
          templateUrl: 'components/saytell/partial.html',
          link: linkingFunction
        };
  }]);
