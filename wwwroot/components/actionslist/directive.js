/* global angular */
angular
    .module('triskelion.actionsList.directive',[])
    .directive('actionsListDirective', ['$location', 'objectFindByKey', 'actionNotFound', 'infoText',
        'hotkeyAction',
        function($location, objectFindByKey, actionNotFound, infoText, hotkeyAction) {
          'use strict';

          function linkingFunction(scope, element) {
            scope.element = element;
          }

          function controller($scope) {
            $scope.formatAction = hotkeyAction;

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
              actions: '='
            },
            templateUrl: 'components/actionslist/partial.html',
            link: linkingFunction
          };
        }]);
