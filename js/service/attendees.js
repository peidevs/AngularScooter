'use strict';
scooter.factory('attendees', function ($http, scooter) {
    var self = this;
    self.attendees = [];

    $http.get('attendees.json').then(function (result) {
        result.data.forEach(function (attendee) {
            self.attendees.push({
                name: attendee.name,
                isAlive: true
            })
        });
    });

    var doesWinnerExist = function(){
        var numberPlayersStillInGame = self.attendees.filter( function( attendee){
            return attendee.isAlive;
        }).length;

        return (numberPlayersStillInGame <= 1);
    }

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
        }
    }
});