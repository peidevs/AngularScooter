'use strict';
scooter.factory('attendees', function ($http) {
    var self = this;
    self.attendees = [];

    var getRandom = function (min, max) {
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    };

    var doesWinnerExist = function () {
        var numberPlayersStillInGame = self.attendees.filter(function (attendee) {
            return attendee.isAlive;
        }).length;

        return (numberPlayersStillInGame <= 1);
    };

    var isLoserThisRound = function () {
        return (getRandom(1, 4) === 1);
    };

    var randomizeAttendees = function () {
        for (var i = 0; i < self.attendees.length; i++) {
            var j = getRandom(0, (self.attendees.length - 1));
            var temp = self.attendees[i];
            self.attendees[i] = self.attendees[j];
            self.attendees[j] = temp;
        }
    };

    var loadPlayers = function() {
        var storedPlayers = localStorage.getItem("attendees");

        try {
            var storedAttendees = JSON.parse(storedPlayers);
            storedAttendees.forEach(function (attendee) {
                self.attendees.push(new Player(attendee.name, attendee.thumb_link));
            });
        }catch(error){
            console.log("clearing local storage so issue doesn't continue");
            localStorage.clear();

            self.attendees = [];
        }
    }

    loadPlayers();
    randomizeAttendees();

    return {
        get: function () {
            return self.attendees;
        },

        update: function (players) {
            self.attendees = players;
        },

        play: function () {
            self.attendees.forEach(function (attendee) {
                if (!doesWinnerExist() && isLoserThisRound()) {
                    attendee.isAlive = false;
                }
            });

            if (doesWinnerExist()) {
                self.attendees.forEach(function( attendee ){
                   attendee.isWinner = attendee.isAlive; //winner is the only one alive
                });
            }
        },

        reset: function () {
            self.attendees.forEach(function (attendee) {
                attendee.isAlive = true;
                attendee.isWinner = false;
            });

            randomizeAttendees();
        }
    };
});