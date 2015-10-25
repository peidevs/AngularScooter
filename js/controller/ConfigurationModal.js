'use strict';
scooter.controller('ConfigurationModal', function ($scope, $modalInstance, $q, config, attendees, meetupService) {
    $scope.themes = config.themes;
    $scope.selectedTheme = angular.copy(config.theme);

    $scope.players = angular.copy(attendees.get());
    $scope.selectedAlivePlayers = [];
    $scope.selectedDeadPlayers = [];

    $scope.playerToAdd = "";

    $scope.isMeetupError = false;

    $scope.cancel = function () {
        $modalInstance.dismiss();
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
        config.theme = $scope.selectedTheme;

        if (validatePlayerList()) {
            updateWinnerStatus();

            $modalInstance.close({
                theme: $scope.selectedTheme,
                attendees: $scope.players
            });
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

    $scope.retrievePlayers = function() {

        meetupService.retrieveEvent( $scope.apiKey, $scope.groupName, $scope.meetupDate).then( function eventSuccess(event)
        {
            var attendeePromise = meetupService.retrieveAttendees( $scope.apiKey, event.id);
            var elderPromise = meetupService.retrieveElders($scope.apiKey, $scope.groupName);

            $q.all( {
                attendees : attendeePromise,
                elders : elderPromise
            }).then( function( results )
            {
                //Add +1

                //Filter Elders
                var attending = results.attendees.filter( function(rsvp){
                    return !results.elders.some( function(elder){
                        return elder.member_id === rsvp.member.member_id;
                    });
                });

                $scope.players = attending.map( function(rsvp){
                    return new Player(rsvp.member.name);
                });

                $scope.meetupStatus = "Loaded Event - " + event.name + " " + results.attendees.length + " attending";
                $scope.isMeetupError = false;
            }, function(error){
                $scope.meetupStatus = error.problem || 'Unexpected error loading events';
                $scope.isMeetupError = true;
            } );
        }, function failure(error){
            $scope.meetupStatus = error.problem || 'Unexpected error loading events';
            $scope.isMeetupError = true;
        });

    }

});