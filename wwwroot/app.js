/* global angular, d3 */
angular
    .module('Game', [
        'ngRoute',
        'triskelion.gameGrid.controller',
        'triskelion.startScreen.controller',
        'triskelion.camp.controller',
        'triskelion.mapScreen.controller',
        'triskelion.characterSheet.controller',

        'triskelion.actionsList.directive',
        'triskelion.saytell.directive',
        'triskelion.partyList.directive',
        'triskelion.locationBar.directive',
        'triskelion.aurasList.directive',
        'triskelion.statsCard.directive',
        
        'triskelion.utils.actionDispatcher.service',
        'triskelion.utils.aiSpeech.service',
        'triskelion.utils.dice.service',
        'triskelion.utils.dictionary.service',
        'triskelion.utils.stringManipulations.service',
        'triskelion.utils.tileService.service',

        // to be replaced by a cloud based data service
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
                .when('/camp', {
                    templateUrl: "components/camp/layout.html",
                    controller: 'campController'
                })
                .when('/charactersheet/:characterkey', {
                    templateUrl: "components/charactersheet/layout.html",
                    controller: 'characterSheetController'
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
