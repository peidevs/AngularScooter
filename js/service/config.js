'use strict';
scooter.factory( 'config', function(){

    var theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : 'scooter';
    var showProfilePictures = localStorage.getItem("showProfilePictures") ? (localStorage.getItem("showProfilePictures") === "true") : false;

    this.theme = theme;

    this.themes = [ //There is such a thing as .value (angular type like factory) to store constants like this
        { name: 'Scooter', path: 'scooter'},
        { name: 'PEIDevs', path: 'pei'},
        { name: 'Sticky Note', path: 'postit' }
    ];

    this.showProfilePictures = showProfilePictures;

    return this;
});