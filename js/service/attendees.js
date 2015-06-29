'use strict';
scooter.factory('attendees', function ($http) {
    var self = this;
    self.attendees = [];

    var getRandom = function (min, max) {
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    };

    var doesWinnerExist = function(){
        var numberPlayersStillInGame = self.attendees.filter( function( attendee){
            return attendee.isAlive;
        }).length;

        return (numberPlayersStillInGame <= 1);
    };

    var isLoserThisRound = function(){
        return (getRandom(1, 4) === 1);
    };

    var randomizeAttendees = function(){
        for (var i = 0; i < self.attendees.length; i++) {
            var j = getRandom(0, (self.attendees.length -1) );
            var temp = self.attendees[i];
            self.attendees[i] = self.attendees[j];
            self.attendees[j] = temp;
        }
    };


    $http.get('attendees.json').then(function (result) {
        result.data.forEach(function (attendee) {
            self.attendees.push({
                name: attendee.name,
                isAlive: true
            })
        });

        randomizeAttendees();
    });

    return {
        get : function(){
            return self.attendees;
        },

        update : function( players ){
            self.attendees = players;
        },

        play : function(){
            self.attendees.forEach( function( attendee){
                if( !doesWinnerExist() && isLoserThisRound() ){
                   attendee.isAlive = false;
                };
            });
        },

        reset : function () {
            self.attendees.forEach( function( attendee ){
                attendee.isAlive = true;
            } );

            randomizeAttendees();
        }
    };
});