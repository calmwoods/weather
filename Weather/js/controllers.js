var weatherControllers = (function () {
    var weatherControllers = angular.module('weatherControllers', []);

    weatherControllers.controller('ManyCitiesCtrl',
        ['$scope', 'weatherService', function ($scope, weatherService) {
            weatherService.getWeather($scope);
        }]);

    weatherControllers.controller('EachCityCtrl',
        ['$scope', '$routeParams', 'weatherService', function ($scope, $routeParams, weatherService) {
            weatherService.getEachWeather($scope, $routeParams.cityname, $routeParams.weekweather);
        }]);

    weatherControllers.controller('BodyCtrl',
        ['$scope', '$route', function ($scope, $route) {

            if ($scope.unit != 'c' || $scope.unit != 'f') {
                $scope.unit = 'c';
            }

            $scope.updateUnit = function (unit) {
                $scope.unit = unit;
                $route.reload();
            };
        }]);

    return weatherControllers;
}());
