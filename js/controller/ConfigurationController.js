'use strict';
scooter.controller('ConfigurationController', function ($scope, $location, $q, config, attendees, meetupService) {
    $scope.themes = config.themes;
    $scope.selectedTheme = angular.copy(config.theme);

    $scope.showProfilePictures = angular.copy(config.showProfilePictures);

    $scope.players = angular.copy(attendees.get());
    $scope.selectedAlivePlayers = [];
    $scope.selectedDeadPlayers = [];


    $scope.playerToAdd = "";

    $scope.isMeetupError = false;


    $scope.cancel = function () {
        $location.path("/");
        //TODO Make sure model isn't changed on cancel
    };

    var validatePlayerList = function () {
        return $scope.players.some(function( player ){
            return player.isAlive;
        });
    };

    var updateWinnerStatus = function () {

        var numPlayersStillAlive = $scope.players.filter( function( player){
            return player.isAlive;
        }).length;

        if( numPlayersStillAlive === 1){
            $scope.players.forEach(function( player ){
                player.isWinner = player.isAlive;
            });
        } else {
            $scope.players.forEach(function (attendee) {
                attendee.isWinner = false;
            });
        }
    };

    $scope.save = function () {

        if (validatePlayerList()) {
            updateWinnerStatus();
            attendees.update($scope.players);

            config.theme = $scope.selectedTheme;
            config.showProfilePictures = $scope.showProfilePictures;

            $location.path("/");
        } else {
            console.log( "Need 1 active player");
        }
    };

    $scope.killPlayer = function () {
        $scope.selectedAlivePlayers.forEach(function (player) {
            player.isAlive = false;
        });
    };

    $scope.resurrectPlayer = function () {
        $scope.selectedDeadPlayers.forEach(function (player) {
            player.isAlive = true;
        })
    };

    $scope.addPlayer = function () {
        if ($scope.playerToAdd) {
            $scope.players.push(new Player($scope.playerToAdd));
            $scope.playerToAdd = "";
        }
    };

    $scope.removePlayer = function(){
        $scope.players = $scope.players.filter( function(player){
           return !$scope.selectedDeadPlayers.some( function(selectedDeadPlayer){
               return selectedDeadPlayer.name === player.name && !player.isAlive;
           });
        });
    };

    $scope.retrievePlayers = function() {

        $scope.isLoading = true;

        meetupService.retrieveEvent( $scope.apiKey, $scope.groupName, $scope.meetupDate).then( function eventSuccess(event)
        {
            var attendeePromise = meetupService.retrieveAttendees( $scope.apiKey, event.id );
            var elderPromise = meetupService.retrieveElders( $scope.apiKey, $scope.groupName );

            $q.all( {
                attendees : attendeePromise,
                elders : elderPromise
            }).then( function( results )
            {
                var guests = meetupService.retrieveGuests( results.attendees );

                results.attendees = results.attendees.concat( guests );



                var rawNumberOfGuests = results.attendees.length;

                results.attendees = meetupService.filterElders( results.attendees, results.elders );

                $scope.players = results.attendees.map( function( rsvp ){
                    var thumb_link;
                    if (rsvp.member_photo) {
                        thumb_link = rsvp.member_photo.thumb_link;
                    }
                    return new Player( rsvp.member.name, thumb_link);
                });

                $scope.meetupStatus = "Loaded Event - " + event.name + " " + results.attendees.length + " attending. (" + rawNumberOfGuests + " Raw)";
                $scope.isMeetupError = false;
                $scope.isLoading = false;
            }, function(error){
                $scope.meetupStatus = error.problem || 'Unexpected error loading events';
                $scope.isMeetupError = true;
                $scope.isLoading = false;
            } );
        }, function failure(error){
            $scope.meetupStatus = error.problem || 'Unexpected error loading events';
            $scope.isMeetupError = true;
            $scope.isLoading = false;
        });
    }


});