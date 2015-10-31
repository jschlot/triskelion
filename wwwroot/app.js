/* global angular, d3 */
angular
    .module('Game', [
        'ngRoute',
        'triskelion.gameGrid.controller',
        'triskelion.startScreen.controller',
        'triskelion.camp.controller',
        'triskelion.mapScreen.controller',
        'triskelion.characterSheet.controller',
        'triskelion.combatScreen.controller',
        'triskelion.recapScreen.controller',
        'triskelion.zoomScreen.controller',

        'triskelion.actionsList.directive',
        'triskelion.saytell.directive',
        'triskelion.partyList.directive',
        'triskelion.locationBar.directive',
        'triskelion.aurasList.directive',
        'triskelion.statsCard.directive',

        'triskelion.utils.accessControl.service',
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
        function ($routeProvider, $compileProvider) {
            'use strict';

            $compileProvider.debugInfoEnabled(false);
            $routeProvider
                .when('/startscreen', {
                    templateUrl: 'components/startscreen/layout.html',
                    controller: 'startScreenController'
                })
                .when('/camp', {
                    templateUrl: 'components/camp/layout.html',
                    controller: 'campController'
                })
                .when('/recap', {
                    templateUrl: 'components/recap/layout.html',
                    controller: 'recapScreenController'
                })
                .when('/charactersheet/:characterkey', {
                    templateUrl: 'components/charactersheet/layout.html',
                    controller: 'characterSheetController'
                })
                .when('/gamegrid', {
                    templateUrl: 'components/gamegrid/layout.html',
                    controller: 'gameGridController'
                })
                .when('/mapscreen', {
                    templateUrl: 'components/mapscreen/layout.html',
                    controller: 'mapScreenController'
                })
                .when('/combat', {
                    templateUrl: 'components/combat/layout.html',
                    controller: 'combatScreenController'
                })
                .otherwise({
                    redirectTo: '/startscreen'
                });
        }
    ]);
