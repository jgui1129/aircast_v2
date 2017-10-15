angular.module('Aircast.controllers')
  .controller('LocationController',
  ['$scope', '$state', 'RpiService', 'AuthService',
    function($scope, $state, RpiService, AuthService) {

      // Parameters:
      // location
      //
      // hgs
      // 11

      $scope.checked = function(val) {
        console.log(val)
        if(val.value == 'all') {
          $scope.locations = $scope.original_locations
        }
        else {
          $scope.locations = _.filter($scope.original_locations, function(i){ return i.Location== val.value; });
        }
      }


      AuthService.currentUser()
        .then(function(d){

          if(!d) {
            $state.go('login')
          }
          else if(d.UserID == '1') {
            loc = {
              loc: "hgs"
            }
          }
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

                $scope.accounts = [
                  {
                    name: 'All',
                    value: 'all'
                  }
                ]

                $scope.account_chosen = $scope.accounts[0]

                _.each(_.uniq(_.map($scope.locations, function(x) {return x.Location})), function(x){
                  d = {
                    name: x,
                    value: x
                  }
                  $scope.accounts.push(d)
                })
                console.log($scope.locations)
                $scope.original_locations = $scope.locations
        })
      });




}]);
