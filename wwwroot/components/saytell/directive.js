/* global angular */
angular
  .module('triskelion.saytell.directive',[])
  .directive('autofocus', ['$timeout', function ($timeout) {
      return {
          restrict: 'A',
          link: function ($scope, $element) {
              $timeout(function () {
                  $element[0].focus();
              });
          }
      };
  }])
  .directive('saytellDirective', ['objectFindByKey', 'actionNotFound', 'infoText',
      function (objectFindByKey, actionNotFound, infoText) {
          'use strict';

          function linkingFunction(scope, element) {
              scope.element = element;
          }

          function controller($scope) {
              $scope.say = function (event) {
                  var lookup, hotkey, keynum;

                  if (!event) { return; }
                  keynum = event.which || event.keyCode;
                  hotkey = String.fromCharCode(keynum);

                  if (hotkey) {
                      lookup = objectFindByKey($scope.actions, 'hotkey', hotkey);
                  }

                  $scope.tells = [];

                  if (lookup) {
                      $scope.callback(lookup);
                  } else if (isFinite(parseInt(hotkey)) && objectFindByKey($scope.actions, 'hotkey', "#")) {
                      $scope.callback(parseInt(hotkey));
                  } else {
                      $scope.tells.push(actionNotFound());
                  }

                  $scope.prompt = '';
              };

              $scope.$on('$destroy', function () {
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
                  actions: '=',
                  callback: '='
              },
              templateUrl: 'components/saytell/partial.html',
              link: linkingFunction
          };
      }]);
