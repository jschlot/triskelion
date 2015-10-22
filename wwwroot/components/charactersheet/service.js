/* global angular */
angular
    .module('triskelion.charactersheet.menuOptions.service', [])
    .service('characterSheetMenuOptions',
        function() {
            'use strict';
            var characterSheetMenuOptions = {
                backtoselect: {
                    name: "Back to Select",
                    hotkey: "B",
                    _self: "backtoselect"
                },
            };

            return characterSheetMenuOptions;
        }
    );