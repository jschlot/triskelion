/* global angular */
angular
    .module('triskelion.utils.aiSpeech.service', [])
    .service('sarcasticQuips',
        function() {
            'use strict';
            var sarcasticQuips = [
                "Huh? What was that?",
                "I don't get it.",
                "Whatever did you mean?",
                "Hmmm, I don't think you typed that right.",
                "I didn't recognize your request."
            ];

            return sarcasticQuips;
        }
    )
    .service('sarcasticOuches',
        function() {
            'use strict';
            var sarcasticOuches = [
                "Ouch!",
                "Thwack!"
            ];

            return sarcasticOuches;
        }
    )
    .service('actionNotFound', [ 'sarcasticQuips',
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
    .service('ouchHappened', [ 'sarcasticOuches',
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
