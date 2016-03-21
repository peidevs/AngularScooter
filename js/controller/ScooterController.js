'use strict';
scooter.controller('ScooterController', function ($scope, $location, attendees, config) {

    $scope.theme = config.theme;

    $scope.attendees = attendees.attendees;

    $scope.playGame = attendees.play;
    $scope.resetGame = attendees.reset;

    $scope.showProfilePictures = config.showProfilePictures;

    $scope.config = function(){
        $location.path('/config');
    }

});