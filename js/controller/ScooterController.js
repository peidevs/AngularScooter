'use strict';
scooter.controller('ScooterController', function ($scope, attendees) {

    $scope.attendees = attendees.get();

    $scope.playGame = attendees.play;
    $scope.resetGame = attendees.reset;
});