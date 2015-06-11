'use strict';
scooter.factory( 'config', function(){
    this.theme = 'scooter';

    this.themes = [ //There is such a thing as .value (angular type like factory) to store constants like this
        { name: 'Scooter', path: 'scooter'},
        { name: 'PEIDevs', path: 'pei'},
        { name: 'Sticky Note', path: 'postit' }
    ];

    return this;
});