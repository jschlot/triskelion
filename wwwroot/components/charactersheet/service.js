/* global angular */
angular
    .module('triskelion.charactersheet.menuOptions.service', [])
    .service('characterSheetMenuOptions',
        function() {
            'use strict';
            var characterSheetMenuOptions = {
                confirm: {
                    name: "Confirm",
                    hotkey: "C",
                    _self: "confirm"
                },
                backtoselect: {
                    name: "Back to Select",
                    hotkey: "B",
                    _self: "backtoselect"
                },
            };

            return characterSheetMenuOptions;
        }
    );