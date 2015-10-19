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
        'triskelion.locationBar.directive',
        'triskelion.aurasList.directive',

        'triskelion.utils.actionDispatcher.service',
        'triskelion.utils.aiSpeech.service',
        'triskelion.utils.dice.service',
        'triskelion.utils.dictionary.service',
        'triskelion.utils.stringManipulations.service',

        'triskelion.utils.levelMap.service',
        
        //// should not be in dungeonService
        'triskelion.utils.tileService.service',

        // this will need rethinking also
        'triskelion.utils.dungeon.service',
        'triskelion.utils.globalData.service'
    ])
    .config([
        '$routeProvider', '$compileProvider',
        function($routeProvider, $compileProvider) {
            'use strict';
            
            $compileProvider.debugInfoEnabled(false);
            $routeProvider
                .when('/startscreen', {
                    templateUrl: "components/startscreen/layout.html",
                    controller: 'startScreenController'
                })
                .when('/partyselect', {
                    templateUrl: "components/partyselect/layout.html",
                    controller: 'partySelectController'
                })
                .when('/gamegrid', {
                    templateUrl: "components/gamegrid/layout.html",
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
