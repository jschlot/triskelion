/* global angular */
angular
    .module('triskelion.character.service', [])
    .service('ability',
        function () {
            'use strict';
            var ability = {
                heal: {
                    name: 'Healing Word',
                    hotkey: 'h',
                    _self: 'heal',
                    actionType: 'heal',
                    description: '',
                    aura: 'light',
                    save: 'agility',
                    level: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 4
                    },
                    miss: null
                },
                curewounds: {
                    name: 'Cure Wounds',
                    hotkey: 'c',
                    _self: 'curewounds',
                    actionType: 'heal',
                    description: '',
                    aura: 'light',
                    save: 'agility',
                    level: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 8
                    },
                    miss: null
                },
                missile: {
                    name: 'Magic Missile',
                    hotkey: 'M',
                    _self: 'missile',
                    actionType: 'damage',
                    description: '',
                    aura: 'force',
                    save: 'agility',
                    level: 1,
                    modifier: 8,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 4
                    },
                    miss: null
                },
                burninghands: {
                    name: 'Burning Hands',
                    hotkey: 'B',
                    _self: 'burninghands',
                    actionType: 'damage',
                    description: '',
                    aura: 'force',
                    save: 'agility',
                    level: 2,
                    modifier: 8,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 6
                    },
                    miss: null
                },
                aimedshot: {
                    name: 'Aimed Shot',
                    hotkey: 'A',
                    _self: 'aimedshot',
                    actionType: 'damage',
                    description: '',
                    aura: 'piercing',
                    save: 'agility',
                    level: 1,
                    modifier: 10,
                    hit: {
                        numberOfDice: 3,
                        diceSides: 6
                    },
                    miss: null
                },
                sneakattack: {
                    name: 'Sneak Attack',
                    hotkey: 'S',
                    _self: 'sneakattack',
                    actionType: 'damage',
                    description: '',
                    aura: 'slashing',
                    save: 'agility',
                    level: 1,
                    modifier: 8,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 20
                    },
                    miss: {
                        numberOfDice: 1,
                        diceSides: 4
                    }
                }
            };

            return ability;
        }
    )
    .service('race',
        function () {
            'use strict';
            var race = {
                human: {
                    name: 'Human',
                    hotkey: 'H',
                    _self: 'human'
                },
                elf: {
                    name: 'Elf',
                    hotkey: 'e',
                    _self: 'elf'
                },
                dwarf: {
                    name: 'Dwarf',
                    hotkey: 'D',
                    _self: 'dwarf'
                }
            };

            return race;
        }
    )
    .service('spec',
        function () {
            'use strict';
            var spec = {
                priest: {
                    name: 'Priest',
                    hotkey: 'P',
                    _self: 'priest',
                    classType: 'healer'
                },
                ranger: {
                    name: 'Ranger',
                    hotkey: 'R',
                    _self: 'ranger',
                    classType: 'fighter'
                },
                wizard: {
                    name: 'Wizard',
                    hotkey: 'W',
                    _self: 'wizard',
                    classType: 'caster'
                },
                scout: {
                    name: 'Scout',
                    hotkey: 'S',
                    _self: 'scout',
                    classType: 'rogue'
                },
                cleric: {
                    name: 'Priest',
                    hotkey: 'P',
                    _self: 'cleric',
                    classType: 'healer'
                },
                knight: {
                    name: 'Knight',
                    hotkey: 'K',
                    _self: 'knight',
                    classType: 'fighter'
                },
                mage: {
                    name: 'Mage',
                    hotkey: 'M',
                    _self: 'mage',
                    classType: 'caster'
                },
                thief: {
                    name: 'Thief',
                    hotkey: 'S',
                    _self: 'thief',
                    classType: 'rogue'
                },
                adept: {
                    name: 'Adept',
                    hotkey: 'A',
                    _self: 'adept',
                    classType: 'healer'
                },
                berserker: {
                    name: 'Berserker',
                    hotkey: 'B',
                    _self: 'berserker',
                    classType: 'fighter'
                },
                necromancer: {
                    name: 'Necromancer',
                    hotkey: 'N',
                    _self: 'necromancer',
                    classType: 'caster'
                },
                burglar: {
                    name: 'burglar',
                    hotkey: 'B',
                    _self: 'burglar',
                    classType: 'rogue'
                }
            };

            return spec;
        }
    )
    .service('armor',
        function () {
            'use strict';
            var armor = {
                cloth: {
                    name: 'Cloth Robes',
                    hotkey: 'C',
                    _self: 'cloth',
                    rating: 10
                },
                leather: {
                    name: 'Leather Vestments',
                    hotkey: 'L',
                    _self: 'leather',
                    rating: 15
                },
                plate: {
                    name: 'Plate Armor',
                    hotkey: 'P',
                    _self: 'plate',
                    rating: 18
                }
            };

            return armor;
        }
    )
    .service('weapon',
        function () {
            'use strict';
            var weapon = {
                staff: {
                    name: 'Glowing Wooden Staff',
                    hotkey: 'G',
                    _self: 'staff',
                    aura: 'blunt',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 6
                    },
                    miss: null
                },
                bow: {
                    name: 'Bow of Yew',
                    hotkey: 'B',
                    _self: 'bow',
                    aura: 'piercing',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 8
                    },
                    miss: null
                },
                wand: {
                    name: 'Wand of the Storm',
                    hotkey: 'W',
                    _self: 'wand',
                    aura: 'lightning',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 4
                    },
                    miss: null
                },
                spear: {
                    name: 'Spear of Iron',
                    hotkey: 'S',
                    _self: 'spear',
                    aura: 'piercing',
                    save: 'agility',
                    itemLevel: 1,
                    modifier: 1,
                    hit: {
                        numberOfDice: 1,
                        diceSides: 6
                    },
                    miss: null
                }
            };

            return weapon;
        }
    );

/* global angular */
angular
    .module('triskelion.camp.service', [])
    .service('campActions',
        function () {
            'use strict';
            var campActions = {
                add: {
                    name: 'Add Party Member',
                    hotkey: 'A',
                    _self: 'add'
                },
                remove: {
                    name: 'Remove Party Member',
                    hotkey: 'R',
                    _self: 'remove'
                },
                back: {
                    name: 'Back',
                    hotkey: 'B',
                    _self: 'back'
                },
                backtoselect: {
                    name: 'Back To Select',
                    hotkey: 'B',
                    _self: 'backtoselect'
                },
                confirmAdd: {
                    name: 'Confirm',
                    hotkey: 'C',
                    _self: 'confirmAdd'
                },
                enter: {
                    name: 'Enter Game',
                    hotkey: 'E',
                    _self: 'enter'
                },
                quit: {
                    name: 'Quit Game',
                    hotkey: 'Q',
                    _self: 'quit'
                },
                viewplayer: {
                    name: '#View Player',
                    hotkey: '#',
                    _self: 'viewplayer'
                }
            };

            return campActions;
        }
    );

/* global angular */
angular
    .module('triskelion.charactersheet.service', [])
    .service('characterSheetMenuOptions',
        function () {
            'use strict';
            var characterSheetMenuOptions = {
                backtoselect: {
                    name: 'Back to Select',
                    hotkey: 'B',
                    _self: 'backtoselect'
                }
            };

            return characterSheetMenuOptions;
        }
    );

/* global angular */
angular
    .module('triskelion.combatScreen.service', [])
    .service('combatScreenMenuOptions',
        function () {
            'use strict';
            var combatScreenMenuOptions = {
                next: {
                    name: 'Next',
                    hotkey: 'N',
                    _self: 'next'
                },
                fight: {
                    name: 'Fight',
                    hotkey: 'F',
                    _self: 'fight'
                },
                spell: {
                    name: 'Spell',
                    hotkey: 'S',
                    _self: 'spell'
                },
                use: {
                    name: 'Use',
                    hotkey: 'U',
                    _self: 'use'
                },
                run: {
                    name: 'Run',
                    hotkey: 'R',
                    _self: 'run'
                },
                choosetarget: {
                    name: '#Choose',
                    hotkey: '#',
                    _self: 'choosetarget'
                },
                choosespell: {
                    name: '#Choose',
                    hotkey: '#',
                    _self: 'choosespell'
                },
                party: {
                    name: 'Party',
                    hotkey: 'P',
                    _self: 'party'
                },
                mobs: {
                    name: 'Mobs',
                    hotkey: 'M',
                    _self: 'mobs'
                }
            };

            return combatScreenMenuOptions;
        }
    );

/* global angular */
angular
    .module('triskelion.recapscreen.service', [])
    .service('recapScreenMenuOptions',
        function () {
            'use strict';
            var recapScreenMenuOptions = {
                playagain: {
                    name: 'Play Again',
                    hotkey: 'P',
                    _self: 'playagain'
                }
            };

            return recapScreenMenuOptions;
        }
    );

/* global angular */
angular
    .module('triskelion.startscreen.service', [])
    .service('startScreenMenuOptions',
        function () {
            'use strict';
            var startScreenMenuOptions = {
                newgame: {
                    name: 'New Game',
                    hotkey: 'N',
                    _self: 'newgame'
                },
                continuegame: {
                    name: 'Continue Game',
                    hotkey: 'C',
                    _self: 'continuegame'
                },
                savegame: {
                    name: 'Save Game',
                    hotkey: 'S',
                    _self: 'savegame'
                }
            };

            return startScreenMenuOptions;
        }
    );

/* global angular, d3 */
angular
    .module('triskelion.gamegrid.mapModal.service', [])
    .service('mapModal', [
        function () {
            'use strict';
            var mapModal = function (message) {
                var scaleX = d3.scale.linear(),
                    scaleY = d3.scale.linear(),
                    vis = d3.select('#mazeRunner');

                // requires that the mazerunner has been loaded
                vis.selectAll('polygon.modal')
                    .data([[{'x': 200, 'y': 130}, {'x': 200,'y': 170}, {'x': 300,'y': 170}, {'x': 300,'y': 130}]])
                    .enter().append('polygon')
                    .attr('class', 'modal')
                        .attr('points', function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(',');
                            }).join(' ');
                        });

                vis.selectAll('text').data([message])
                    .enter()
                    .append('text')
                    .attr('class', 'center-label')
                    .attr('x',250)
                    .attr('y',154)
                    .attr('text-anchor','middle')
                    .text(function (d) {
                        return d;
                    });
                return true;
            };
            return mapModal;
        }
    ]);

/* global angular, d3 */
angular
    .module('triskelion.gamegrid.mazeRunner.service', [])
    .service('mazeRunner', ['tileService',
        function (tileService) {
            'use strict';

            var mazeRunner = function (currentView) {
                var check, wallFactory, doorFactory, coordinates,
                    view = currentView.reverse(),
                    vis = d3.select('#mazeRunner')
                            .attr('viewBox', '0 0 500 300'),
                    scaleX = d3.scale.linear(),
                    scaleY = d3.scale.linear();

                vis.selectAll('*').remove();

                wallFactory = function (data, className) {
                    vis.selectAll('polygon.' + className)
                        .data([data])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('points',function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x),scaleY(d.y)].join(',');
                            }).join(' ');
                        });
                };

                doorFactory = function (data, className) {
                    vis.selectAll('polygon.' + className)
                        .data([data])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('points',function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x),scaleY(d.y)].join(',');
                            }).join(' ');
                        });
                };

                coordinates = {
                    leftFront: [{'x': 0, 'y': 0}, {'x': 0,'y': 300}, {'x': 60,'y': 270}, {'x': 60,'y': 30}],
                    leftFrontThru: [{'x': 0, 'y': 30}, {'x': 0,'y': 270}, {'x': 60,'y': 270}, {'x': 60,'y': 30}],
                    leftMid: [{'x': 60, 'y': 30}, {'x': 60,'y': 270}, {'x': 120,'y': 240}, {'x': 120,'y': 60}],
                    leftMidThru: [{'x': 0, 'y': 60}, {'x': 0,'y': 240}, {'x': 120,'y': 240}, {'x': 120,'y': 60}],
                    leftBack: [{'x': 120, 'y': 60}, {'x': 120,'y': 240}, {'x': 180,'y': 210}, {'x': 180,'y': 90}],
                    leftBackThru: [{'x': 60, 'y': 90}, {'x': 60,'y': 210}, {'x': 180,'y': 210}, {'x': 180,'y': 90}],
                    rightFront: [{'x': 440, 'y': 30}, {'x': 440,'y': 270}, {'x': 500,'y': 300}, {'x': 500,'y': 0}],
                    rightFrontThru: [{'x': 440, 'y': 30}, {'x': 440,'y': 270}, {'x': 500,'y': 270}, {'x': 500,'y': 30}],
                    rightMid: [{'x': 380, 'y': 60}, {'x': 380,'y': 240}, {'x': 440,'y': 270}, {'x': 440,'y': 30}],
                    rightMidThru: [{'x': 380, 'y': 60}, {'x': 380,'y': 240}, {'x': 500,'y': 240}, {'x': 500,'y': 60}],
                    rightBack: [{'x': 320, 'y': 90}, {'x': 320,'y': 210}, {'x': 380,'y': 240}, {'x': 380,'y': 60}],
                    rightBackThru: [{'x': 320, 'y': 90}, {'x': 320,'y': 210}, {'x': 440,'y': 210}, {'x': 440,'y': 90}],

                    backgroundClosedBack: [{'x': 180, 'y': 90}, {'x': 180,'y': 210}, {'x': 320,'y': 210}, {'x': 320,'y': 90}],
                    backgroundClosedMid: [{'x': 120, 'y': 60}, {'x': 120,'y': 240}, {'x': 380,'y': 240}, {'x': 380,'y': 60}],
                    backgroundClosedFront: [{'x': 60, 'y': 30}, {'x': 60,'y': 270}, {'x': 440,'y': 270}, {'x': 440,'y': 30}],
                    backgroundDoorFrontPanel: [{'x': 165, 'y': 75},{'x': 165, 'y': 255},{'x': 335, 'y': 255},{'x': 335, 'y': 75}],
                    backgroundDoorFrontArch: [{'x': 90, 'y': 45}, {'x': 90,'y': 255}, {'x': 165,'y': 255}, {'x': 165,'y': 75}, {'x': 335,'y': 75}, {'x': 335,'y': 255}, {'x': 410,'y': 255}, {'x': 410,'y': 45}],


                    backgroundLeftThru: [{'x': 100, 'y': 110}, {'x': 100,'y': 190}, {'x': 200,'y': 190}, {'x': 200,'y': 110}],
                    backgroundRightThru: [{'x': 300, 'y': 110}, {'x': 300,'y': 190}, {'x': 400,'y': 190}, {'x': 400,'y': 110}],

                    backgroundLeftEnd: [{'x': 180, 'y': 90}, {'x': 180,'y': 210}, {'x': 220,'y': 190}, {'x': 220,'y': 110}],
                    backgroundRightEnd: [{'x': 280, 'y': 110}, {'x': 280,'y': 190}, {'x': 320,'y': 210}, {'x': 320,'y': 90}],

                    backgroundMidThru: [{'x': 200, 'y': 110}, {'x': 200,'y': 190}, {'x': 300,'y': 190}, {'x': 300,'y': 110}],

                    backgroundDoorBackPanel: [{'x': 220, 'y': 120},{'x': 220, 'y': 200},{'x': 280, 'y': 200},{'x': 280, 'y': 120}],
                    backgroundDoorBackArch: [{'x': 200, 'y': 100}, {'x': 200,'y': 200}, {'x': 220,'y': 200}, {'x': 220,'y': 120}, {'x': 280,'y': 120}, {'x': 280,'y': 200}, {'x': 300,'y': 200}, {'x': 300,'y': 100}],

                    backgroundDoorMidPanel: [{'x': 195, 'y': 100},{'x': 195, 'y': 225},{'x': 305, 'y': 225},{'x': 305, 'y': 100}],
                    backgroundDoorMidArch: [{'x': 150, 'y': 75}, {'x': 150,'y': 225}, {'x': 195,'y': 225}, {'x': 195,'y': 100}, {'x': 305,'y': 100}, {'x': 305,'y': 225}, {'x': 350,'y': 225}, {'x': 350,'y': 75}]

                };

                // depth 4's background goes first as it's the final back wall,
                // also we skip the door since the back wall is sort of a hack
                if (tileService.isBlock(view[0][1])) {
                    wallFactory(coordinates.backgroundMidThru, 'mid-5');
                }

                // right side
                if (view[0] && tileService.isBlock(view[0][0])) {
                    wallFactory(coordinates.backgroundRightThru, 'right-5');
                }

                if (view[1] && tileService.isBlock(view[1][0])) {
                    wallFactory(coordinates.backgroundRightEnd, 'right-4b');
                    wallFactory(coordinates.rightBackThru, 'right-4a');
                }

                if (view[2] && tileService.isBlock(view[2][0])) {
                    wallFactory(coordinates.rightBack, 'right-3b');
                    wallFactory(coordinates.rightMidThru, 'right-3a');
                }

                if (view[3] && tileService.isBlock(view[3][0])) {
                    wallFactory(coordinates.rightMid, 'right-2b');
                    wallFactory(coordinates.rightFrontThru, 'right-2a');
                }

                if (view[4] && tileService.isBlock(view[4][0])) {
                    wallFactory(coordinates.rightFront, 'right-1');
                }

                // left side
                if (view[0] && tileService.isBlock(view[0][2])) {
                    wallFactory(coordinates.backgroundLeftThru, 'left-5');
                }

                if (view[1] && tileService.isBlock(view[1][2])) {
                    wallFactory(coordinates.backgroundLeftEnd, 'left-4b');
                    wallFactory(coordinates.leftBackThru, 'left-4a');
                }

                if (view[2] && tileService.isBlock(view[2][2])) {
                    wallFactory(coordinates.leftBack, 'left-3b');
                    wallFactory(coordinates.leftMidThru, 'left-3a');
                }

                if (view[3] && tileService.isBlock(view[3][2])) {
                    wallFactory(coordinates.leftMid, 'left-2b');
                    wallFactory(coordinates.leftFrontThru, 'left-2a');
                }

                if (view[4] && tileService.isBlock(view[4][2])) {
                    wallFactory(coordinates.leftFront, 'left-1');
                }

                // up the middle, always skip the 4th tile because we assume it's empty cuz you're standing in it

                if (view[1]) {
                    if (tileService.isBlock(view[1][1])) {
                        wallFactory(coordinates.backgroundLeftEnd, 'left-4b');
                        wallFactory(coordinates.backgroundRightEnd, 'right-4b');
                        wallFactory(coordinates.backgroundClosedBack, 'mid-4');
                    }
                    check = tileService.isDoor(view[1][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorBackPanel, 'mid-4');
                        }
                        doorFactory(coordinates.backgroundDoorBackArch, 'mid-door-4');
                    }
                }

                if (view[2]) {
                    if (tileService.isBlock(view[2][1])) {
                        wallFactory(coordinates.leftBack, 'left-3b');
                        wallFactory(coordinates.rightBack, 'right-3b');
                        wallFactory(coordinates.backgroundClosedMid, 'mid-3');
                    }
                    check = tileService.isDoor(view[2][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorMidPanel, 'mid-3');
                        }
                        doorFactory(coordinates.backgroundDoorMidArch, 'mid-door-3');
                    }
                }

                if (view[3]) {
                    if (tileService.isBlock(view[3][1])) {
                        wallFactory(coordinates.leftMid, 'left-2b');
                        wallFactory(coordinates.rightMid, 'right-2b');
                        wallFactory(coordinates.backgroundClosedFront, 'mid-2');
                    }
                    check = tileService.isDoor(view[3][1]);
                    if (check) {
                        if (check !== 'ns-arch' && check !== 'ew-arch') {
                            wallFactory(coordinates.backgroundDoorFrontPanel, 'mid-2');
                        }
                        doorFactory(coordinates.backgroundDoorFrontArch, 'mid-door-2');
                    }
                }
            };

            return mazeRunner;
        }
    ]);

/* global angular */
angular
    .module('triskelion.gamegrid.menuOptions.service', [])
    .service('gameGridMenuOptions',
        function () {
            'use strict';
            var menuOptions = {
                forward: {
                    name: 'Forward',
                    hotkey: 'F',
                    _self: 'forward'
                },
                goleft: {
                    name: 'Left',
                    hotkey: 'L',
                    _self: 'left'
                },
                goright: {
                    name: 'Right',
                    hotkey: 'R',
                    _self: 'right'
                },
                camp: {
                    name: 'Camp',
                    hotkey: 'C',
                    _self: 'camp'
                },
                map: {
                    name: 'Map',
                    hotkey: 'M',
                    _self: 'map'
                }
            };

            return menuOptions;
        }
    );

/* global angular */
angular
    .module('triskelion.mapscreen.menuOptions.service', [])
    .service('mapScreenMenuOptions',
        function () {
            'use strict';
            var partyActions = {
                returntogame: {
                    name: 'Return to Game',
                    hotkey: 'R',
                    _self: 'returntogame'
                }
            };

            return partyActions;
        }
    );

/* global angular, d3 */
angular
    .module('triskelion.mapscreen.miniMap.service', [])
    .service('miniMap', ['tileService',
        function (tileService) {
            'use strict';
            var miniMap = function (map) {
                var vis,
                    width = map[0].length, // assumes all map levels have equal dimensions
                    height = map.length,
                    canvas = {width: 940, height: 570},
                    scaleX,
                    scaleY,
                    cellFactory,
                    topleft,
                    botleft,
                    botright,
                    toprright,
                    yOffset,
                    yBotOffset,
                    plot;

                vis = d3.select('#minimap')
                        .attr('viewBox', '0 0 940 570');

                vis.selectAll('*').remove();

                scaleX = d3.scale.linear()
                        .domain([0, width])
                        .range([0, canvas.width]);

                scaleY = d3.scale.linear()
                        .domain([0, height])
                        .range([0, canvas.height]);

                cellFactory = function (plotCoords, className, tile) {
                    var isDoor = tileService.isDoor(tile),
                        fill = tileService.mapClass(tile),
                        xPadding,
                        yPadding,
                        cell,
                        dir,
                        doorType,
                        rectWidth,
                        rectHeight,
                        lineCenter,
                        lineMid,
                        idxA,
                        idxB;

                    cell = vis.append('svg:g')
                            .attr('class', className);

                    cell.selectAll('polygon.' + className)
                        .data([plotCoords])
                        .enter().append('polygon')
                        .attr('class', className)
                        .attr('class', fill)
                        .attr('points', function (d) {
                            return d.map(function (d) {
                                return [scaleX(d.x), scaleY(d.y)].join(',');
                            }).join(' ');
                        });

                    if (isDoor) {
                        dir = isDoor.substr(0,2);
                        rectWidth = (dir === 'ew') ? 0.20 : 0.50;
                        rectHeight = (dir === 'ew') ? 0.50 : 0.20;
                        lineCenter = (dir === 'ew') ? rectHeight : 0;
                        lineMid = (dir === 'ew') ? 0 : rectWidth;
                        idxA = (dir === 'ew') ? 1 : 2;
                        idxB = (dir === 'ew') ? 1 : 0;
                        doorType = isDoor.substr(3, isDoor.length);
                        xPadding = (1 - rectWidth) / 2;
                        yPadding = (1 - rectHeight) / 2;


                        cell.selectAll('line.' + className)
                            .data([plotCoords])
                            .enter()
                            .append('svg:line')
                            .attr('class', className)
                            .attr('x1', function (d, i) {
                                return scaleX(d[0].x + lineCenter);
                            })
                            .attr('y1', function (d, i) {
                                return scaleY(d[0].y + lineMid);
                            })
                            .attr('x2', function (d, i) {
                                return scaleX(d[idxA].x + lineCenter);
                            })
                            .attr('y2', function (d, i) {
                                return scaleY(d[idxB].y + lineMid);
                            });


                        cell.selectAll('rect.' + className + '.' + doorType)
                            .data([plotCoords])
                            .enter()
                            .append('svg:rect')
                            .attr('class', className + ' ' + doorType)
                            .attr('fill', function () {
                                return (doorType === 'unlocked' || doorType === 'arch') ? 'white' : 'black';
                            })
                            .attr('x', function (d, i) {
                                return scaleX(d[0].x) + scaleX(xPadding);
                            })
                            .attr('y', function (d, i) {
                                return scaleY(d[0].y) + scaleY(yPadding);
                            })
                            .attr('width', scaleX(rectWidth))
                            .attr('height', scaleY(rectHeight));
                    }
                };

                for (var i = 0; i < width; i++) {
                    topleft = i;
                    botleft = i;
                    botright = i + 1;
                    toprright = i + 1;

                    for (var j = 0; j < height; j++) {
                        yOffset = j;
                        yBotOffset = 1 + j;
                        plot = [
                            {'x': topleft, 'y': yOffset},
                            {'x': botleft, 'y': yBotOffset},
                            {'x': botright, 'y': yBotOffset},
                            {'x': toprright, 'y': yOffset}
                        ];

                        cellFactory(plot, 'c-' + i + '-' + j, map[j][i]);
                    }
                }
            };

            return miniMap;
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.accessControl.service', [])
    .service('accessControl', ['userData', 'partyDB',
        function (userData, partyDB) {

            'use strict';

            // userData.gameMode, partyDB.members.length, userData.gameModuleSelected
            this.check = function (test) {
                var obj,
                    gameMode = userData.gameMode,
                    partySize = partyDB.members.length,
                    gameModuleSelected = userData.gameModuleSelected;

                obj = {
                    'downtime': function() {
                        return (gameMode === 'downtime' && gameModuleSelected) ? true : false;
                    },
                    'exploration': function() {
                        return (gameMode === 'exploration' && partySize) ? true : false;
                    },
                    'combat': function() {
                        return (gameMode === 'combat' && partySize) ? true : false;
                    },
                    'social': function() {
                        return (gameMode === 'social' && partySize) ? true : false;
                    }
                };

                return obj[test];
            };
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.actionDispatcher.service', [])
    .service('actionDispatcher',
        function () {
            'use strict';
            var actionDispatcher = function (transformationFn, value) {
                return (transformationFn || angular.identity)(value);
            };
            return actionDispatcher;
        }
    );

/* global angular */
angular
    .module('triskelion.utils.aiSpeech.service', [])
    .service('actionNotFound', ['sarcasticQuips',
        function (sarcasticQuips) {
            'use strict';
            var actionNotFound = function () {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticQuips.length);

                return sarcasticQuips[i];
            };
            return actionNotFound;
        }
    ])
    .service('ouchHappened', ['sarcasticOuches',
        function (sarcasticOuches) {
            'use strict';
            var ouchHappened = function () {
                // This service returns a random quip
                var i = Math.floor(Math.random() * sarcasticOuches.length);

                return sarcasticOuches[i];
            };
            return ouchHappened;
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.dice.service', [])
    .service('diceService',
        function () {
            'use strict';
            this.roll = function (howmany, sides) {
                var total = 0;
                for (var i = 0; i < howmany; i++) {
                    total += Math.floor(Math.random() * sides) + 1;
                }
                return total;
            };
        }
    );

/* global angular */
angular
    .module('triskelion.utils.dictionary.service', [])
    .service('sarcasticQuips',
        function () {
            'use strict';
            var sarcasticQuips = [
                'Huh? What was that?',
                'I don\'t get it.',
                'Whatever did you mean?',
                'Hmmm, I don\'t think you typed that right.',
                'I didn\'t recognize your request.'
            ];

            return sarcasticQuips;
        }
    )
    .service('sarcasticOuches',
        function () {
            'use strict';
            var sarcasticOuches = [
                'Ouch!',
                'Thwack!'
            ];

            return sarcasticOuches;
        }
    )
    .service('infoText',
        function () {
            'use strict';
            var infoText = {
                chooseEnemy: "Choose a enemy to fight.",
                chooseSpell: "Choose a spell to cast.",
                chooseItem: "Choose an item to use?",
                chosenThing: "PLAYER uses THING and EFFECT.",
                startscreen: 'Welcome to Triskelion.',
                recapscreen: 'Level Complete',
                choosemodule: 'To begin, choose an adventure',
                mapscreen: 'Map',
                combatscreen: 'Combat',
                camp: 'Camp',
                actionchoice: 'You chose STRING',
                playerRuns: "PLAYER flees.",
                chooseTargetGroup: "Cast on Party member or a Mob?",
                chooseTargetPlayer: "Who is your target?",
                initiativeRolled: 'TEAM wins the advantage, and will go first',
                auraDamage: 'PLAYER takes DAMAGE points of damage from ACTOR',
                auraHeal: 'PLAYER receives HEALTH points of healing from ACTOR',
                auraMissed: 'PLAYER was missed',
                auraOverheal: 'PLAYER was overhealed by OVERHEAL',
                playerTurn: 'It is PLAYER\'s turn',
                targetSelected: 'PLAYER targeted ACTOR',
                removePlayer: 'Who will you ask to leave the party?',
                whowilljoin: 'Who will you add to the party?',
                whowillleave: 'Who will you remove to the party?',
                closeminimap: 'R)eturn to Game',
                campingislovely: 'Your team kicks it\'s collective shoes off, leans back, and smokes the halfling leaf for 2 turns...',
                deathNote: ' and has died',
                alldead: 'All players in the party are dead. You must return to camp.',
                charactersheet: 'Character Sheet: CHARACTER',
                describeCharacter: 'NAME, RACE SPEC',
                xpEarned: 'Your party is granted POINTS experience.',
                partyDinged: 'PLAYER has advanced to level LEVEL', // TO-DO
                gavesaved: 'Game saved',
                keys: {
                    name: 'Name: VALUE',
                    spec: 'Spec: VALUE',
                    armor: 'Armor: VALUE',
                    health: 'Health: VALUE',
                    abilities: 'Abilities: VALUE',
                    race: 'Race: VALUE'
                }
            };

            return infoText;
        }
    );

/* global angular */
angular
    .module('triskelion.utils.globalData.service', ['triskelion.party.factory', 'triskelion.character.hero.factory', 'triskelion.monster.factory'])
    .service('gameModules', [
        function () {
            'use strict';

            var gameModules = {
                dungeon: {
                    name: 'Dungeon of Grim Souls',
                    hotkey: 'D',
                    _self: 'dungeon',
                    maxparty: 3,
                    mapRows: 20, // offset by 1
                    mapCols: 30, // offset by 1
                    defaultCompassDirection: 'south',
                    defaultLevel: 0,
                    startingCoordinates: [1,1], // [ X, Y ]
                    map: [
                        {
                            name: 'The Catacombs',
                            layout: [
                                // action tiles start at 0x20, 0x18 is floor, 0x1A is a door, 0xFF is the exit

                                // 0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],  // 0
                                [0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 1
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01],  // 2
                                [0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01],  // 3
                                [0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x26, 0x18, 0x01, 0x18, 0x27, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01],  // 4
                                [0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x24, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x26, 0x18, 0x01, 0x18, 0x27, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 5
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 6
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x24, 0x18, 0x01, 0x18, 0x25, 0x19, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01],  // 7
                                [0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x1C, 0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01],  // 8
                                [0x01, 0x18, 0x18, 0x25, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x18, 0x19, 0x29, 0x29, 0x01, 0x18, 0x01],  // 9
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x01],  // 10
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01],  // 11
                                [0x01, 0x01, 0x01, 0x1A, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01],  // 12
                                [0x01, 0x01, 0x18, 0x23, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x28, 0x18, 0x01, 0x18, 0x01, 0x1C, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 13
                                [0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x01, 0x18, 0x18, 0x18, 0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01],  // 14
                                [0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x18, 0x18, 0x18, 0x20, 0x18, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x18, 0x18, 0x01, 0x01, 0x18, 0x2A, 0x01, 0x01, 0x1C, 0x01],  // 15
                                [0x01, 0x18, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x20, 0x01, 0x01, 0x28, 0x01, 0x01, 0x01, 0x01, 0x18, 0x01, 0x01, 0x2A, 0x18, 0x01, 0x01, 0x18, 0x01],  // 16
                                [0x01, 0xFE, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x18, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x1B, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x18, 0x01],  // 17
                                [0x01, 0x18, 0x18, 0x22, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x01],  // 18
                                [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]  // 19
                            ]
                        }
                    ],
                    tileActions: [
                        {
                            description: 'A spray of lava splashes on the party!',
                            actionType: 'damage',
                            repeater: 1,
                            aura: 'fire',
                            save: 'agility',
                            modifier: 1,
                            hit: {
                                numberOfDice: 1,
                                diceSides: 4
                            },
                            miss: null
                        },
                        {
                            description: 'A ray of light shines upon the group!',
                            actionType: 'heal',
                            repeater: 2,
                            aura: 'light',
                            save: null,
                            modifier: 0,
                            hit: {
                                numberOfDice: 2,
                                diceSides: 8
                            },
                            miss: null
                        },
                        {
                            description: 'A eerie wailing sound comes from down the hallway...',
                            actionType: 'message',
                            repeater: 9999
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        },
                        {
                            description: 'You stumble upon a pair of Elvish Fiends!',
                            actionType: 'combat',
                            repeater: 0,
                            save: null,
                            mobMembers: [
                                { spec: 'fiend', level: 1 },
                                { spec: 'fiend', level: 2 }
                            ]
                        }
                    ]
                }
            };

            return gameModules;
        }
    ])
    .service('userData', [
        function () {
            'use strict';

            var userData = {
                gameModuleSelected: null,
                cursor: {},
                gameMode: 'downtime'
            };
            return userData;
        }
    ])
    .service('partyDB', ['Party',
        function (Party) {
            'use strict';

            var partyDB = new Party();
            return partyDB;
        }
    ])
    .service('mobDB', ['Party', 'monsterMaker',
        function (Party, monsterMaker) {
            'use strict';

            var mobDB = new Party();

            mobDB.add = function(mob) {
                angular.forEach(mob, function (player) {
                    mobDB.members.push(monsterMaker.spawn(player));
                });
            };

            return mobDB;
        }
    ])
    .service('tellsList', [
        function () {
            'use strict';

            var tellsList = {};
            tellsList.log = [];
            return tellsList;
        }
    ])
    .service('aurasList', [
        function () {
            'use strict';

            var aurasList = {};
            aurasList.log = [];
            return aurasList;
        }
    ])
    .service('playerDB',['heroMaker',
        function (heroMaker) {
            'use strict';

            var playerDB = [];
            playerDB.push(heroMaker.spawn({name: 'Devonellah', spec: 'priest'}));
            playerDB.push(heroMaker.spawn({name: 'Corianna', spec: 'ranger'}));
            playerDB.push(heroMaker.spawn({name: 'Belanor', spec: 'wizard'}));
            playerDB.push(heroMaker.spawn({name: 'Hedroxx', spec: 'scout'}));

            return playerDB;
        }]
    );

/* global angular */
angular
    .module('triskelion.utils.levelMap.service', [])
    .service('levelMap', ['tileService',
        function (tileService) {
            'use strict';
            var map = [],
                width = 9,
                height = 9,
                depth = 4;

            this.init = function (config) {
                for (var i = 0; i < width; i++) {
                    map[i] = new Array(height);
                    for (var j = 0; j < height; j++) {
                        if (config[i]) {
                            map[i][j] = config[i][j];
                        } else {
                            map[i][j] = tileService.set.NOTHING;
                        }
                    }
                }
            };

            this.setDimensions = function (w, h) {
                width = w;
                height = h;
            };

            this.setDepth = function (d) {
                depth = d;
            };

            this.getMap = function () {
                return map;
            };

            this.debugMap = function (orientation) {
                var header = [];
                header[0] = orientation[0];
                for (var i = 0; i < height; i++) {
                    header.push(i.toString(16).toUpperCase());
                }
                console.log(header.join(', '));
                for (var j = 0; j < width; j++) {
                    var row = map[j].join(', ');
                    console.log(j.toString(16).toUpperCase() + ': ' + row);
                }
            };

            this.debugView = function (view, orientation) {
                var header = [];
                header[0] = orientation[0];
                for (var i = 0; i < 3; i++) {
                    header.push(i.toString(16).toUpperCase());
                }
                console.log(header.join(', '));
                for (var j = 0; j <= depth; j++) {
                    var row = view[j].join(', ');
                    console.log(j.toString(16).toUpperCase() + ': ' + row);
                }
            };

            this.getView = function (xCoord, yCoord, orientation) {
                if (!orientation) {
                    orientation = 'north';
                }

                var currentTile = [];
                for (var i = 0; i <= depth; i++) {
                    currentTile[i] = new Array(3);
                    for (var j = 0; j < 3; j++) {
                        currentTile[i][j] = tileService.set.NOTHING;
                    }
                    switch (orientation) {
                        case 'north':
                            if (map[yCoord - i]) {
                                currentTile[i][2] = (map[yCoord - i][xCoord - 1]) ? map[yCoord - i][xCoord - 1] : tileService.set.NOTHING;
                                currentTile[i][1] = (map[yCoord - i][xCoord]) ? map[yCoord - i][xCoord] : tileService.set.NOTHING;
                                currentTile[i][0] = (map[yCoord - i][xCoord + 1]) ? map[yCoord - i][xCoord + 1] : tileService.set.NOTHING;
                            }
                            break;
                        case 'south':
                            if (map[yCoord + i]) {
                                currentTile[i][0] = (map[yCoord + i][xCoord - 1]) ? map[yCoord + i][xCoord - 1] : tileService.set.NOTHING;
                                currentTile[i][1] = (map[yCoord + i][xCoord]) ? map[yCoord + i][xCoord] : tileService.set.NOTHING;
                                currentTile[i][2] = (map[yCoord + i][xCoord + 1]) ? map[yCoord + i][xCoord + 1] : tileService.set.NOTHING;
                            }
                            break;
                        case 'east':
                            if (map[yCoord - 1]) {
                                currentTile[i][2] = (map[yCoord - 1][xCoord + i]) ? map[yCoord - 1][xCoord + i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord]) {
                                currentTile[i][1] = (map[yCoord][xCoord + i]) ? map[yCoord][xCoord + i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord + 1]) {
                                currentTile[i][0] = (map[yCoord + 1][xCoord + i]) ? map[yCoord + 1][xCoord + i] : tileService.set.NOTHING;
                            }
                            break;
                        case 'west':
                            if (map[yCoord - 1]) {
                                currentTile[i][0] = (map[yCoord - 1][xCoord - i]) ? map[yCoord - 1][xCoord - i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord]) {
                                currentTile[i][1] = (map[yCoord][xCoord - i]) ? map[yCoord][xCoord - i] : tileService.set.NOTHING;
                            }
                            if (map[yCoord + 1]) {
                                currentTile[i][2] = (map[yCoord + 1][xCoord - i]) ? map[yCoord + 1][xCoord - i] : tileService.set.NOTHING;
                            }
                            break;
                    }
                }

                return currentTile;
            };

            this.updateTile = function (xCoord, yCoord, tileBit) {
                map[yCoord][xCoord] = tileBit;
            };
        }
    ]);

/* global angular */
angular
    .module('triskelion.utils.stringManipulations.service', [])
    .factory('objectFindByKey',
        function () {
            'use strict';
            var objectFindByKey = function (array, key, value) {
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
        function () {
            'use strict';
            var hotkeyAction = function (action) {
                var hotkey = action.hotkey, remainder;

                if (action.name) {
                    remainder = action.name.substr(1,action.name.length);
                    return hotkey + ')' + remainder;
                } else {
                    return null;
                }
            };
            return hotkeyAction;
        }
    );

/* global angular */
angular
    .module('triskelion.utils.tileService.service', [])
    .service('tileService', ['actionDispatcher', 'userData', 'infoText', 'diceService', 'partyDB',
        function (actionDispatcher, userData, infoText, diceService, partyDB) {
            'use strict';

            this.action = function (value) {
                var actionsList = [],
                    lookup, event, messages = [], tells = value.tells, gameMode = 'exploration';

                // the exit
                if (value._self > 253) {
                    return 'recap';
                } else if (value._self < 32) {
                    return gameMode;
                }

                actionsList = userData.gameModuleSelected.tileActions;
                lookup = value._self - 32;
                event = actionsList[lookup];

                if (!event) {
                    return gameMode;
                }

                if (event.repeater < 0) {
                    return gameMode;
                }

                switch (event.actionType) {
                    case 'damage':
                        messages = partyDB.aoeDamage(event);
                        if (messages.length) {
                            this.spoolMessages(tells, messages);
                        }
                        event.repeater--;
                        break;
                    case 'heal':
                        messages = partyDB.aoeHeal(event);
                        if (messages.length) {
                            this.spoolMessages(tells, messages);
                        }
                        event.repeater--;
                        break;
                    case 'combat':
                        gameMode = 'combat';
                        break;
                    case 'social':
                        gameMode = 'social';
                        break;
                    case 'container':
                        gameMode = 'container';
                        break;
                    case 'message':
                        this.spoolMessages(tells, [event.description]);
                        event.repeater--;
                        break;
                }
                return gameMode;
            };

            this.spoolMessages = function(tells, messages) {
                angular.forEach(messages, function(value) {
                    tells.push(value);
                });
            };

            this.isBlock = function (tile) {
                return (tile < 24) ? true : false;
            };

            this.isDoor = function (tile) {
                var isDoor;
                if (tile === 26) {
                    isDoor = 'ns-unlocked';
                } else if (tile === 25) {
                    isDoor = 'ew-unlocked';
                } else if (tile === 5) {
                    isDoor = 'ns-locked';
                } else if (tile === 4) {
                    isDoor = 'ew-locked';
                } else if (tile === 27 || tile === 255) {
                    isDoor = 'ew-arch';
                } else if (tile === 28 || tile === 254) {
                    isDoor = 'ns-arch';
                }
                return isDoor;
            };

            this.canGoForward = function (tile) {
                return (tile > 23) ? true : false;
            };

            this.mapClass = function (tile) {
                var mapClass = 'wall';
                if (tile > 23) {
                    mapClass = 'floor';
                } else if (tile === 4) {
                    mapClass = 'floor';
                } else if (tile === 5) {
                    mapClass = 'floor';
                }

                return mapClass;
            };

            this.set = {
                'NOTHING': 0x00,
                'FLOOR': 0x18
            };
        }
    ]);
