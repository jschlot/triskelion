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

        'triskelion.utils.mazeRunner.service',
        'triskelion.utils.miniMap.service',
        'triskelion.utils.mapModal.service',
        'triskelion.utils.levelMap.service',
        'triskelion.utils.dice.service',
        'triskelion.utils.dictionary.service',
        'triskelion.utils.aiSpeech.service',
        'triskelion.utils.stringManipulations.service',
        'triskelion.utils.globalData.service',
        'triskelion.utils.npc.service',
        'triskelion.utils.dungeon.service',
        'triskelion.utils.tileService.service',
        'triskelion.utils.actionDispatcher.service',

        'triskelion.player.factory'
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
