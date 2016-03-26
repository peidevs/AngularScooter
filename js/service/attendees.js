'use strict';
scooter.factory('attendees', function ($http) {
    var attendees = [];

    var getRandom = function (min, max) {
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    };

    var doesWinnerExist = function () {
        var numberPlayersStillInGame = attendees.filter(function (attendee) {
            return attendee.isAlive;
        }).length;

        return (numberPlayersStillInGame <= 1);
    };

    var isLoserThisRound = function () {
        return (getRandom(1, 4) === 1);
    };

    var randomizeAttendees = function () {
        for (var i = 0; i < attendees.length; i++) {
            var j = getRandom(0, (attendees.length - 1));
            var temp = attendees[i];
            attendees[i] = attendees[j];
            attendees[j] = temp;
        }
    };

    var loadPlayers = function() {
        var storedPlayers = localStorage.getItem("attendees");

        try {
            var storedAttendees = JSON.parse(storedPlayers);
            storedAttendees.forEach(function (attendee) {
                attendees.push(new Player(attendee.name, attendee.thumb_link));
            });
        }catch(error){
            console.log("clearing local storage so issue doesn't continue");
            localStorage.clear();

            attendees = [];
        }
    }

    loadPlayers();
    randomizeAttendees();

    return {
        get : function(){
          return attendees;
        },

        update : function( value ){
            attendees = value;

            //TODO Save Image URL of player as well if available? Doublecheck to see if this does that
            localStorage.setItem( "attendees", JSON.stringify (value));
        },

        play: function () {
            attendees.forEach(function (attendee) {
                if (!doesWinnerExist() && isLoserThisRound()) {
                    attendee.isAlive = false;
                }
            });

            if (doesWinnerExist()) {
                attendees.forEach(function( attendee ){
                   attendee.isWinner = attendee.isAlive; //winner is the only one alive
                });
            }
        },

        reset: function () {
            attendees.forEach(function (attendee) {
                attendee.isAlive = true;
                attendee.isWinner = false;
            });

            randomizeAttendees();
        }
    };
});