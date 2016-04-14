'use strict';
var scooter = angular.module( 'scooter', ['ngRoute']);

scooter.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/gameBoard.html',
                controller: 'ScooterController',
                controllerAs : 'scooterCtrl'
            }).
            when('/config', {
                templateUrl: 'views/config.html',
                controller: 'ConfigurationController',
                controllerAs : 'configCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);