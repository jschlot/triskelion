/* global angular */
angular
    .module('triskelion.actionsList.directive',[])
    .directive('actionsListDirective', ['$location', 'objectFindByKey', 'actionNotFound', 'infoText',
        'hotkeyAction',
        function ($location, objectFindByKey, actionNotFound, infoText, hotkeyAction) {
            'use strict';

            function linkingFunction(scope, element) {
                scope.element = element;
            }

            function controller($scope) {
                $scope.formatAction = hotkeyAction;

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
                    actions: '='
                },
                templateUrl: 'components/actionslist/partial.html',
                link: linkingFunction
            };
        }]);

/* global angular */
angular
    .module('triskelion.aurasList.directive',[])
    .directive('aurasListDirective', [
        function () {
            'use strict';

            function linkingFunction(scope, element) {
                scope.element = element;
            }

            function controller($scope) {
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
                    auras: '='
                },
                templateUrl: 'components/auraslist/partial.html',
                link: linkingFunction
            };
        }]);

/* global angular */
angular
    .module('triskelion.locationBar.directive',[])
    .directive('locationBarDirective', [
        function () {
            'use strict';

            function linkingFunction(scope, element) {
                scope.element = element;
            }

            function controller($scope) {
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
                    page: '='
                },
                templateUrl: 'components/locationbar/partial.html',
                link: linkingFunction
            };
        }]);

/* global angular */
angular
    .module('triskelion.partyList.directive',[])
    .directive('partyListDirective', [
        function () {
            'use strict';

            function linkingFunction(scope, element) {
                scope.element = element;
            }

            function controller($scope) {
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
                    partydata: '=',
										ismob: '=',
										partylevel: '='
                },
                templateUrl: 'components/partylist/partial.html',
                link: linkingFunction
            };
        }]);

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

              if ($scope.tells) {
                  $scope.buffer = $scope.tells.length > 3 ? $scope.tells.slice(-4) : $scope.tells;
              }

              $scope.say = function (event) {
                  var lookup, hotkey, keynum;

                  if (!event) { return; }

                  keynum = event.which || event.keyCode;
                  hotkey = String.fromCharCode(keynum);

                  if (keynum > 36 && keynum < 40) {
                      var dict = { "37": "L", "38": "F", "39": "R", };
                      hotkey = dict[keynum];
                  }

                  if (hotkey) {
                      lookup = objectFindByKey($scope.actions, 'hotkey', hotkey);
                  }

                  if (lookup) {
                      $scope.callback(lookup);
                  } else if (isFinite(parseInt(hotkey)) && objectFindByKey($scope.actions, 'hotkey', "#")) {
                      $scope.callback(parseInt(hotkey));
                  } else {
                      $scope.tells.push(actionNotFound());
                  }

                  $scope.buffer = $scope.tells.length > 3 ? $scope.tells.slice(-4) : $scope.tells;

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

/* global angular */
angular
    .module('triskelion.statsCard.directive',[])
    .directive('statsCardDirective', [
        function () {
            'use strict';

            function linkingFunction(scope, element) {
                scope.element = element;
            }

            function controller($scope) {
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
                    character: '='
                },
                templateUrl: 'components/statscard/partial.html',
                link: linkingFunction
            };
        }]);
