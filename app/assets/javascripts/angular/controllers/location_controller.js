angular.module('Aircast.controllers')
  .controller('LocationController',
  ['$scope', '$state', 'RpiService', 'AuthService',
    function($scope, $state, RpiService, AuthService) {

      // Parameters:
      // location
      //
      // hgs
      // 11

      AuthService.currentUser()
        .then(function(d){

          if(!d) {
            $state.go('login')
          }
          else if(d.UserID == '1') {
            loc = {
              loc: "hgs"
            }
            // location = {
            //   location: "11"
            // }

            RpiService.locations(location)
              .then(function(d){
                _.each(d.data, function(i) {
                  i.last = moment(i.LastAlive).calendar()
                  startTime = moment(i.LastAlive)
                  end = moment(new Date());
                  var duration = moment.duration(end.diff(startTime));
                  var hours = duration.asHours();
                  if(hours<1) {
                    i.status = 'LIVE'
                  }
                  else {
                    i.status = 'Inactive'
                  }
                  i.hours = hours

                })

                $scope.locations = d.data
                console.log($scope.locations)
            });
          }
      });




}]);
