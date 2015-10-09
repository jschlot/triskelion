angular
    .module('Game', [
        'ngRoute',
        'triskelion.GameGrid.controller',
        'triskelion.StartScreen.controller',

        'triskelion.actionsList.directive',

        'triskelion.dictionary.service',
        'triskelion.aiSpeech.service',
        'triskelion.stringManipulations.service',
        'triskelion.globalData.service'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {

        $routeProvider
            .when('/startscreen', {
                templateUrl: "components/layouts/menu.html",
                controller: 'StartScreenController'
            })
            .when('/story', {
                templateUrl: "components/layouts/story.html",
                controller: 'GameGridController'
            })
            .when('/start', {
                templateUrl: "components/layouts/menu.html",
                controller: 'GameGridController'
            })
            .when('/home', {
                templateUrl: "components/layouts/menu.html",
                controller: 'GameGridController'
            })
            .when('/character', {
                templateUrl: "components/layouts/grid.html",
                controller: 'GameGridController'
            })
            .when('/crawler', {
                templateUrl: "components/layouts/grid.html",
                controller: 'GameGridController'
            })
            .when('/combat', {
                templateUrl: "components/layouts/grid.html",
                controller: 'GameGridController'
            })
            .when('/loot', {
                templateUrl: "components/layouts/grid.html",
                controller: 'GameGridController'
            })
            .when('/room', {
                templateUrl: "components/layouts/grid.html",
                controller: 'GameGridController'
            })
            .otherwise({
                redirectTo: '/startscreen'
            });
        }
    ]);
