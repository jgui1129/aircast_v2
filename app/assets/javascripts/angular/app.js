var Aircast = angular.module('Aircast', [
  'ui.router',
  'templates',
  'ngCookies',
  "ngSanitize",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.poster",
  'ngMap',
  'ngFileUpload',
  'daterangepicker',
  '720kb.datepicker',
  'uiSwitch',
  'ngDialog',
  'chart.js',
  'Aircast.controllers',
  'Aircast.services'
]);


Aircast.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
