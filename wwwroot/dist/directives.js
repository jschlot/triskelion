/* global angular */
angular
    .module('triskelion.actionsList.directive',[])
    .directive('actionsListDirective', ['$location', 'objectFindByKey', 'actionNotFound', 'infoText', 
        'userData', 'hotkeyAction',
        function($location, objectFindByKey, actionNotFound, infoText, userData, hotkeyAction){
          'use strict';

          function linkingFunction(scope, element){
            scope.element = element;
          }

          function controller($scope){
            $scope.formatAction = hotkeyAction;

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
                actions: "="
            },
            templateUrl: 'components/actionslist/partial.html',
            link: linkingFunction
          };
    }]);

/* global angular */
angular
    .module('triskelion.aurasList.directive',[])
    .directive('aurasListDirective', [
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
                auras: "="
            },
            templateUrl: 'components/auraslist/partial.html',
            link: linkingFunction
          };
    }]);
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
                page: "="
            },
            templateUrl: 'components/locationbar/partial.html',
            link: linkingFunction
          };
    }]);
/* global angular */
angular
    .module('triskelion.partyList.directive',[])
    .directive('partyListDirective', [
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
                partydata: "="
            },
            templateUrl: 'components/partylist/partial.html',
            link: linkingFunction
          };
    }]);
/* global angular */
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
    };
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
              callback: "="
          },
          templateUrl: 'components/saytell/partial.html',
          link: linkingFunction
        };
  }]);
