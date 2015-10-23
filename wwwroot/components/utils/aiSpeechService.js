/* global angular */
angular
    .module('triskelion.utils.aiSpeech.service', [])
    .service('actionNotFound', ['sarcasticQuips',
        function(sarcasticQuips) {
            'use strict';
            var actionNotFound = function() {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticQuips.length);

                return sarcasticQuips[i];
            };
            return actionNotFound;
        }
    ])
    .service('ouchHappened', ['sarcasticOuches',
        function(sarcasticOuches) {
            'use strict';
            var ouchHappened = function() {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticOuches.length);

                return sarcasticOuches[i];
            };
            return ouchHappened;
        }
    ]);
