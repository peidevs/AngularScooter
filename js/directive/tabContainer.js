'use strict';
/**
 *  Code copied and modified from Angular tutorial (MIT Licence)
 *  https://docs.angularjs.org/guide/directive
 */
scooter.directive( "tabContainer", function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'views/partial/_tabContainer.html',
        scope: {},
        controller: ['$scope', function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane) {
                if (panes.length === 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        }]
    };
} );

scooter.directive( "tab", function(){
    return {
        require: '^^tabContainer',
        restrict: 'E',
        scope: {
            name : '@',
            template : '@'
        },
        templateUrl: 'views/partial/_tab.html',
        link: function(scope, element, attrs, parentController) {
            parentController.addPane(scope);
        }
    };
});