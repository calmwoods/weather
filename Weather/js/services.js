weatherApp.factory("weatherService", function ($http) {
    'use strict';
    return {

        getEachWeather: function ($scope, cityName, strWeekWeather) {
            $scope.cityName = cityName;
            var jsonWeekWeather = JSON.parse(strWeekWeather);

            if ($scope.unit == 'c') {
                angular.forEach(jsonWeekWeather, function (dayWeather) {
                    dayWeather.c_high   = Math.round((dayWeather.high - 32) * 5 / 9);
                    dayWeather.c_low    = Math.round((dayWeather.low - 32) * 5 / 9)
                });
            }

            $scope.forecast = jsonWeekWeather;
        },

        getWeather: function ($scope) {
            var cities = [{ name: "Vancouver",   code: 'CAXX0518' },
                          { name: "Honolulu",    code: 'USHI0026' },
                          { name: "San Diego",   code: 'USCA0982' },
                          { name: "Havana Cuba", code: 'CUXX0003' }];

            var forecast    = [];
            var yahooAPI    = "'http://weather.yahooapis.com/forecastrss?p=";
            var format      = "'&format=json&diagnostics=true&callback=";
            var yql         = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D";

            angular.forEach(cities, function (city) {
                var url = yql + yahooAPI + city.code + format;
                $http.get(url).success(function (data) {
                        try {
                            var stringified = JSON.stringify(data);          
                            stringified     = stringified.split("\\n").join(""); 
                            var listing     = JSON.parse(stringified);
                            var weekWeather = listing.query.results.item.forecast;

                            angular.forEach(weekWeather, function (dayWeather) {
                                dayWeather.text = dayWeather.text.replace("/", ", ");
                            });

                            if ($scope.unit == 'c')
                            {
                                weekWeather[0].c_high   = Math.round((weekWeather[0].high - 32) * 5 / 9);
                                weekWeather[0].c_low    = Math.round((weekWeather[0].low - 32) * 5 / 9)
                            }

                            weekWeather.cityName    = city.name;
                            weekWeather.low         = weekWeather[0].low;
                            weekWeather.high        = weekWeather[0].high;

                            forecast.push(weekWeather);
                        }
                        catch (error) {
                            alert("Weather reading error:" + error.name + ": " + error.message);
                        }
                });
            });
            $scope.forecast = forecast;
        },
    }
} );
