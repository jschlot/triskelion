angular
    .module('triskelion.utils.tileService.service', [])
    .factory('tileService',
        function() {
            'use strict';
                /*
                //// TILE BITS THAT STOP NAVIGATION
                0x00    NOTHINGNESS, THE VOID THAT BINDS
                0x01    WALL
                0x02    DOOR
                0x03    PITFALL
                0x04    WATER
                0x05    SPECIAL EVENT
                0x06    TELEPORT START
                0x07    TELEPORT END
                0x08    UP STAIRS
                0x09    DOWN STAIRS
                0x0A    PORTAL
                0x0B    GUARDIAN
                0x0C    CHEST
                ...
                0x0F

                //// TILE BITS THAT ALLOW NAVIGATION
                0x10    ** SURFACES
                0x11    CORRIDOR FLOOR
                ...
                0x1F    SURFACE 15

                0x20    ** MESSAGE ACTIONS
                0x21    MESSAGE 1
                ...
                0x2F    MESSAGE 15

                0x30    ** TRAPS AND AURAS
                0x31    MAGICAL DARKNESS
                0x32    MAGICAL SLEEP SPELL
                ...
                0x3F    TRAP/AURA 15
                */

            var tileService = {
                isBlock: function(tile) {
                    return (tile < 16) ? true : false;
                },
                canGoForward: function(tile) {
                    return (tile > 15) ? true : false;
                },
                mapClass: function(tile) {
                    var className = null;
                    switch (tile) {
                        case 0x00:
                        case 0x01:
                        case 0x02:
                        case 0x03:
                        case 0x04:
                        case 0x05:
                        case 0x06:
                        case 0x07:
                        case 0x08:
                        case 0x09:
                        case 0x0A:
                        case 0x0B:
                        case 0x0C:
                        case 0x0D:
                        case 0x0E:
                        case 0x0F:
                            className = 'wall';
                            break;
                        default:
                            className = 'floor';
                            break;
                    }
                    return className;
                },

                // Pass classnames back for SVG tile classes
                set: {
                    'NOTHING': 0x00,
                    'WALL': 0x01,
                    'CORRIDOR': 0x11,
                    'MESSAGE': 0x21
                }
            }
            return tileService;
        }
    );