'use strict';
scooter.controller( 'ConfigurationModal', function($scope, $modalInstance, config, attendees){
    $scope.themes = config.themes;
    $scope.selectedTheme = angular.copy( config.theme );

    $scope.players = attendees.get();
    $scope.selectedAlivePlayers = [];
    $scope.selectedDeadPlayers = [];

    $scope.cancel = function(){
        $modalInstance.dismiss();
    };

    $scope.save = function(){
        config.theme = $scope.selectedTheme;
        $modalInstance.close( $scope.selectedTheme );

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

});