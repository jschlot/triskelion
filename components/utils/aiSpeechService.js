angular
    .module('triskelion.utils.aiSpeech.service', [])
    .factory('actionNotFound', [ 'sarcasticQuips',
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
    .factory('ouchHappened', [ 'sarcasticOuches',
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
