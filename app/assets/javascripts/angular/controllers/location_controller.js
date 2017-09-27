angular.module('Aircast.controllers')
  .controller('LocationController',
  ['$scope', '$state', 'RpiService',
    function($scope, $state, RpiService) {

      RpiService.locations()
        .then(function(d){
          console.log(d)
      });


}]);
