'use strict';
scooter.factory( 'config', function(){
    this.theme = 'postit';

    this.themes = [
        { name: 'Scooter', path: 'scooter'},
        { name: 'PEIDevs', path: 'pei'},
        { name: 'Sticky Note', path: 'postit' }
    ];

    return this;
});