angular
    .module('Game', [
        'ngRoute',
        'triskelion.gameGrid.controller',
        'triskelion.startScreen.controller',
        'triskelion.partySelect.controller',

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
                    templateUrl: "components/layouts/partyselect.html",
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
                .when('/crawler', {
                    templateUrl: "components/layouts/grid.html",
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
                .when('/room', {
                    templateUrl: "components/layouts/grid.html",
                    controller: 'gameGridController'
                })
                .otherwise({
                    redirectTo: '/startscreen'
                });
        }
    ]);
