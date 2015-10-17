/* global angular, d3 */
angular
    .module('Game', [
        'ngRoute',
        'triskelion.gameGrid.controller',
        'triskelion.startScreen.controller',
        'triskelion.partySelect.controller',
        'triskelion.mapScreen.controller',

        'triskelion.actionsList.directive',
        'triskelion.saytell.directive',
        'triskelion.partyList.directive',

        'triskelion.utils.dictionary.service',
        'triskelion.utils.aiSpeech.service',
        'triskelion.utils.stringManipulations.service',
        'triskelion.utils.globalData.service',
        'triskelion.utils.npc.service',
        'triskelion.utils.dungeon.service',
        'triskelion.utils.tileService.service',
        'triskelion.utils.actionDispatcher.service'
    ])
    .config([
        '$routeProvider', '$compileProvider',
        function($routeProvider, $compileProvider) {
            $compileProvider.debugInfoEnabled(false);
            $routeProvider
                .when('/startscreen', {
                    templateUrl: "components/layouts/menu.html",
                    controller: 'startScreenController'
                })
                .when('/partyselect', {
                    templateUrl: "components/partyselect/layout.html",
                    controller: 'partySelectController'
                })
                .when('/start', {
                    templateUrl: "components/layouts/menu.html",
                    controller: 'gameGridController'
                })
                .when('/home', {
                    templateUrl: "components/layouts/menu.html",
                    controller: 'gameGridController'
                })
                .when('/character', {
                    templateUrl: "components/layouts/grid.html",
                    controller: 'gameGridController'
                })
                .when('/gamegrid', {
                    templateUrl: "components/gamegrid/layout.html",
                    controller: 'gameGridController'
                })
                .when('/combat', {
                    templateUrl: "components/layouts/grid.html",
                    controller: 'gameGridController'
                })
                .when('/loot', {
                    templateUrl: "components/layouts/grid.html",
                    controller: 'gameGridController'
                })
                .when('/mapscreen', {
                    templateUrl: "components/mapscreen/layout.html",
                    controller: 'mapScreenController'
                })
                .otherwise({
                    redirectTo: '/startscreen'
                });
        }
    ]);
