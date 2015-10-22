/* global angular */
angular
    .module('triskelion.camp.service', [])
    .service('campActions',
        function() {
            'use strict';
            var campActions = {
                add: {
                    name: "Add Party Member",
                    hotkey: "A",
                    _self: "add"
                },
                remove: {
                    name: "Remove Party Member",
                    hotkey: "R",
                    _self: "remove"
                },
                back: {
                    name: "Back",
                    hotkey: "B",
                    _self: "back"
                },
                backtoselect: {
                    name: "Back To Select",
                    hotkey: "B",
                    _self: "backtoselect"
                },
                confirmAdd: {
                    name: "Confirm",
                    hotkey: "C",
                    _self: "confirmAdd"
                },
                enter: {
                    name: "Enter Game",
                    hotkey: "E",
                    _self: "enter"
                },
                quit: {
                    name: "Quit Game",
                    hotkey: "Q",
                    _self: "quit"
                },
                viewplayer: {
                    name: "#View Player",
                    hotkey: "#",
                    _self: "viewplayer"
                }
            };

            return campActions;
        }
    );