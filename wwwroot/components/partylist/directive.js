/* global angular */
angular
    .module('triskelion.partyList.directive',[])
    .directive('partyListDirective', [
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
                    partydata: '='
                },
                templateUrl: 'components/partylist/partial.html',
                link: linkingFunction
            };
        }]);
