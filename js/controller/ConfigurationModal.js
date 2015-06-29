'use strict';
scooter.controller( 'ConfigurationModal', function($scope, $modalInstance, config, attendees){
    $scope.themes = config.themes;
    $scope.selectedTheme = angular.copy( config.theme );

    $scope.players = angular.copy( attendees.get());
    $scope.selectedAlivePlayers = [];
    $scope.selectedDeadPlayers = [];

    $scope.playerToAdd = "";

    $scope.cancel = function(){
        $modalInstance.dismiss();
    };

    $scope.save = function(){
        config.theme = $scope.selectedTheme;
        $modalInstance.close( {
            theme : $scope.selectedTheme,
            attendees : $scope.players
        });

    };

    $scope.killPlayer = function(){
        $scope.selectedAlivePlayers.forEach(function( player ){
           player.isAlive = false;
        });
    };

    $scope.resurrectPlayer = function(){
        $scope.selectedDeadPlayers.forEach(function( player ){
            player.isAlive = true;
        })
    };

    $scope.addPlayer = function() {
        if( $scope.playerToAdd ) {
            $scope.players.push( { //TODO I don't like that config knows about attendee. Should be able to "new Player( name )"
                name: $scope.playerToAdd,
                isAlive : true
            });

            $scope.playerToAdd = "";
        }
    }

});