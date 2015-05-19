'use strict';
scooter.factory('attendees', function ($http, scooter) {
    var self = this;
    self.attendees = [];

    var doesWinnerExist = function(){
        var numberPlayersStillInGame = self.attendees.filter( function( attendee){
            return attendee.isAlive;
        }).length;

        return (numberPlayersStillInGame <= 1);
    };

    var randomizeAttendees = function(){
        for (var i = self.attendees.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
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

        play : function(){
            self.attendees.forEach( function( attendee){
                if( !doesWinnerExist() && scooter.isLoserThisRound() ){
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