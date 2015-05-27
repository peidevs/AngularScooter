'use strict';
scooter.controller( 'ConfigurationModal', function($scope, $modalInstance, config){
    $scope.themes = config.themes;
    $scope.selected = angular.copy( config.theme );

    $scope.cancel = function(){
        $modalInstance.dismiss();
    };

    $scope.save = function(){
        config.theme = $scope.selected;
        $modalInstance.close( $scope.selected );

    }

});