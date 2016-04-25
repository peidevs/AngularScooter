'use strict';
scooter.controller('ConfigurationController', function ($location, $q, config, attendees, meetupService) {

    this.themes = config.themes;
    this.selectedTheme = angular.copy(config.theme);
    this.showProfilePictures = angular.copy(config.showProfilePictures);

    this.players = angular.copy(attendees.get());
    this.selectedAlivePlayers = [];
    this.selectedDeadPlayers = [];
    this.playerToAdd = "";

    this.apiKey = '';
    this.groupName = '';
    this.meetupDate = '';
    this.isMeetupError = false;


    this._validatePlayerList = function () {
        return this.players.some(function( player ){
            return player.isAlive;
        });
    };

    this._updateWinnerStatus = function () {

        var numPlayersStillAlive = this.players.filter( function( player){
            return player.isAlive;
        }).length;

        if( numPlayersStillAlive === 1){
            this.players.forEach(function( player ){
                player.isWinner = player.isAlive;
            });
        } else {
            this.players.forEach(function (attendee) {
                attendee.isWinner = false;
            });
        }
    };

    this.cancel = function () {
        $location.path("/");
    };

    this.save = function () {

        if (this._validatePlayerList()) {
            this._updateWinnerStatus();
            attendees.update(this.players);

            config.theme = this.selectedTheme;
            config.showProfilePictures = this.showProfilePictures;
            config.save();

            $location.path("/");

        } else {
            console.log( "Need 1 active player");
        }
    };

    this.killPlayer = function () {
        this.selectedAlivePlayers.forEach(function (player) {
            player.isAlive = false;
        });
    };

    this.resurrectPlayer = function () {
        this.selectedDeadPlayers.forEach(function (player) {
            player.isAlive = true;
        })
    };

    this.addPlayer = function () {
        if (this.playerToAdd) {
            this.players.push(new Player(this.playerToAdd));
            this.playerToAdd = "";
        }
    };

    this.removePlayer = function(){
        this.players = this.players.filter( function(player){
           return !this.selectedDeadPlayers.some( function(selectedDeadPlayer){
               return selectedDeadPlayer.name === player.name && !player.isAlive;
           });
        }, this);
    };

    this.retrievePlayers = function() {
        var processGuestData = function( results ){
            var guests = meetupService.retrieveGuests( results.attendees );

            results.attendees = results.attendees.concat( guests );

            var rawNumberOfGuests = results.attendees.length;

            results.attendees = meetupService.filterElders( results.attendees, results.elders );

            this.players = results.attendees.map( function( rsvp ){
                var thumb_link;
                if (rsvp.member_photo) {
                    thumb_link = rsvp.member_photo.thumb_link;
                }
                return new Player( rsvp.member.name, thumb_link);
            });

            this.meetupStatus = "Loaded Event - " + results.attendees.length + " attending. (" + rawNumberOfGuests + " Raw)";
            this.isMeetupError = false;
            this.isLoading = false;
        };

        var eventInformationLoaded = function( event ){
            var attendeePromise = meetupService.retrieveAttendees( this.apiKey, event.id );
            var elderPromise = meetupService.retrieveElders( this.apiKey, this.groupName );

            $q.all( {
                attendees : attendeePromise,
                elders : elderPromise
            }).then( processGuestData.bind(this), errorLoadingMeetupInformation.bind(this) );
        };

        var errorLoadingMeetupInformation = function( error ){
            this.meetupStatus = error.problem || 'Unexpected error loading events';
            this.isMeetupError = true;
            this.isLoading = false;
        };

        this.isLoading = true;
        meetupService.retrieveEvent( this.apiKey, this.groupName, this.meetupDate)
            .then( eventInformationLoaded.bind(this), errorLoadingMeetupInformation.bind(this));
    };
});