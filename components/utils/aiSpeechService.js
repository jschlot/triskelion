angular
    .module('triskelion.aiSpeech.service', [])
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
    ]);
