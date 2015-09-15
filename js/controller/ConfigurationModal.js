'use strict';
scooter.controller('ConfigurationModal', function ($scope, $modalInstance, config, attendees) {
    $scope.themes = config.themes;
    $scope.selectedTheme = angular.copy(config.theme);

    $scope.players = angular.copy(attendees.get());
    $scope.selectedAlivePlayers = [];
    $scope.selectedDeadPlayers = [];

    $scope.playerToAdd = "";

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
    }

});