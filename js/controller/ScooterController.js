'use strict';
scooter.controller('ScooterController', function ($scope, $modal, attendees, config) {

    $scope.theme = config.theme;

    $scope.attendees = attendees.get();

    $scope.playGame = attendees.play;
    $scope.resetGame = attendees.reset;

    $scope.config = function(){
        var modalHandle = $modal.open({
            templateUrl : 'views/config.html',
            controller: 'ConfigurationModal'
        });

        modalHandle.result.then( function( theme ){
            $scope.theme = theme;
        });
    }
});