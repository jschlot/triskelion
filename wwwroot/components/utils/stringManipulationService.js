/* global angular */
angular
    .module('triskelion.utils.stringManipulations.service', [])
    .factory('objectFindByKey',
        function() {
            'use strict';
            var objectFindByKey = function(array, key, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key].toLowerCase() === value.toLowerCase()) {
                        return array[i];
                    }
                }
                return null;
            };
            return objectFindByKey;
        }
    )
    .factory('hotkeyAction',
        function() {
            'use strict';
            var hotkeyAction = function(action) {
                var hotkey = action.hotkey;

                if (action.name) {
                    var remainder = action.name.substr(1,action.name.length);
                    return hotkey + ')' + remainder;
                } else {
                    return null;
                }
            };
            return hotkeyAction;
        }
    );
