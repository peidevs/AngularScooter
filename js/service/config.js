'use strict';
scooter.factory( 'config', function($rootScope){

    //TODO local Storage is broken for config. no longer saving. Consider changing notify to saveChanges() and put the emit
    // as part of the save

    var theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : 'scooter';
    var showProfilePictures = localStorage.getItem("showProfilePictures") ? (localStorage.getItem("showProfilePictures") === "true") : false;

    this.theme = theme;

    this.themes = [ //There is such a thing as .value (angular type like factory) to store constants like this
        { name: 'Scooter', path: 'scooter'},
        { name: 'PEIDevs', path: 'pei'},
        { name: 'Sticky Note', path: 'postit' }
    ];

    this.showProfilePictures = showProfilePictures;

    this.subscribe = function(scope, callback) {
        var handler = $rootScope.$on('scooter-configuration-updated', callback);
        scope.$on('$destroy', handler);
    };

    this.save = function() {
        localStorage.setItem("theme", this.theme);
        localStorage.setItem("showProfilePicture", this.showProfilePictures);

        $rootScope.$emit('scooter-configuration-updated');
    }

    return this;
});