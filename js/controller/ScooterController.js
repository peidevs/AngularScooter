'use strict';
scooter.controller('ScooterController', function ($scope, $modal, attendees, config) {

    $scope.theme = config.theme;

    $scope.attendees = attendees.get();

    $scope.playGame = attendees.play;
    $scope.resetGame = attendees.reset;

    $scope.showProfilePictures = config.showProfilePictures;

    $scope.config = function(){
        var modalHandle = $modal.open({
            templateUrl : 'views/config.html',
            controller: 'ConfigurationModal'
        });

        modalHandle.result.then( function( results ){
            $scope.theme = results.theme;

            attendees.update( results.attendees );
            $scope.attendees = results.attendees;
            $scope.showProfilePictures = results.showProfilePictures;

            localStorage.setItem("attendees", JSON.stringify( results.attendees ));
        });
    }

});