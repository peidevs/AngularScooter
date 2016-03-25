'use strict';
scooter.controller( 'MainController', function( $scope, config){
    $scope.theme = config.theme;

    config.subscribe($scope, function updateTheme() {
        $scope.theme = config.theme;
    });
});