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


      $scope.reset = function(id) {

        RpiService.location_reset(id)
            .then(function(d){
              console.log(d)
              $scope.locations = _.each($scope.locations, function(i){
                if(i.RpiID == id) {
                  i.status = 'Rebooting'
                }
              });
            })
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
                  var format = 'hh:mm:ss'

                  var time = moment()
                  beforeTime = moment(i.OpenTime, format)
                  afterTime = moment(i.CloseTime, format)


                  if(hours<1) {
                    i.status = 'LIVE'
                  }
                  else if (time.isBetween(beforeTime, afterTime) == false) {
                    i.status = 'Out of Operating Hours'
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
                $scope.locations = _.filter($scope.locations, function(i){ return i.MobileNumber !=0; });
                $scope.original_locations = $scope.locations

                stats($scope.locations)
        })




        stats = function(locations) {
          $scope.active_sites = _.filter(locations, function(i){ return i.status =='LIVE'; });
          active_sites_len = _.filter(locations, function(i){ return i.status =='LIVE'; }).length;
          $scope.inactive_sites = _.filter(locations, function(i){ return i.status =='Inactive'; });
          inactive_sites_len = _.filter(locations, function(i){ return i.status =='Inactive'; }).length;
          total_sites = locations.length

          $scope.location_stats = [{
            label: "Total Sites",
            description: "Check the number of total deployed sites",
            stat: total_sites
          }, {
            label: "Active Sites",
            description: "Check the number of total active sites",
            stat: active_sites_len
          }, {
            label: "Inactive Sites",
            description: "Check the number of total inactive sites",
            stat: inactive_sites_len
          }]
        }
      });




}]);
