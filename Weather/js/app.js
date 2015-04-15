var weatherApp = angular.module('weatherApp', ['ngRoute', 'weatherControllers']).config(function ($routeProvider) {

    'use strict';

    $routeProvider.when("/home", {
        templateUrl:    'views/manycities.html',
        controller:     'ManyCitiesCtrl'
    })

    .when("/eachcity/cityname/:cityname/weekweather/:weekweather", {
        templateUrl:    'views/eachcity.html',
        controller:     'EachCityCtrl'
    })

    .otherwise({ redirectTo: '/home' });
});
