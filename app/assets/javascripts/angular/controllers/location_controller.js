angular.module('Aircast.controllers')
  .controller('LocationController',
  ['$scope', '$state', 'RpiService', 'AuthService', '$timeout', 'DemoService',
    function($scope, $state, RpiService, AuthService, $timeout, DemoService) {

      // Parameters:
      // location
      //
      // hgs
      // 11



  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.datePicker = {}
  $scope.datePicker.date = {
    startDate: moment().subtract(2, "days"),
    endDate: moment().subtract(1, "days")
  };

  location_name = 'davids'

  $scope.status_logs = {}
  $scope.status_logs.startDate = moment($scope.datePicker.date.startDate).unix()
  $scope.status_logs.endDate= moment($scope.datePicker.date.endDate).unix()

  $scope.options = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
            stacked: true,
            ticks: {

                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },
								scaleLabel: {
                   display: true,
                   labelString: "Percentage"
                }
            }]
      },
    };

  $scope.locations_picker = DemoService.locations()

  $scope.update_status = function(location_name) {
    check_status(location_name.id,$scope.status_logs.startDate, $scope.status_logs.endDate)
  }
  check_status = function(location_name, startDate, endDate) {
    RpiService.status_logs(location_name, startDate, endDate)
        .then(function(d){
          console.log(d)
          labels_c = []
          all_active = []

          all_inactive = []

          _.each(d.data.tvs, function(i){
            var start = moment(i.closetime, "HH:mm:ss");
            var end = moment(i.opentime, "HH:mm:ss");
            var start_of_day = moment('00:00:00', "HH:mm:ss");
            var duration = moment.duration(end.diff(start));
            var hours = duration.hours();

            all_hrs = hours * 360
            active = i.logs.length
            // _.each(i.logs, function(time) {
            //   formatted_time = moment(time.Date).format("HH:mm:ss");
            //   console.log(formatted_time)
            //   if (moment(formatted_time).isBetween(end, start)) {
            //     validated_time.push(formatted_time)
            //   }
            // })
            inactive = all_hrs - active

            active_percentage = Math.abs((active/all_hrs)*100)
            inactive_percentage = 100 - active_percentage

            labels_c.push(i.name)
            all_active.push(active_percentage)
            all_inactive.push(inactive_percentage)
          });

          console.log(all_active)
          console.log(all_inactive)
          $scope.labels_c = labels_c
          $scope.series_c = ['Active','Inactive'];
          $scope.data_c = [all_active, all_inactive];

        })
      }

      check_status('davids',$scope.status_logs.startDate, $scope.status_logs.endDate)

      $scope.dateRangeOptions = {
        eventHandlers : {
            'apply.daterangepicker' : function() {
                $scope.status_logs.startDate = moment($scope.datePicker.date.startDate).unix()
                $scope.status_logs.endDate= moment($scope.datePicker.date.endDate).unix()
                check_status(location_name.id,$scope.status_logs.startDate, $scope.status_logs.endDate)
            }
        }
      };


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

      logs = function(id) {



              last_time = moment(d.data.Logs[0].Date).unix();
              initial_time = moment(d.data.Logs[d.data.Logs.length - 1].Date).unix();


              i = initial_time
              unix_times = []
              active_unix = []
              while (i < last_time) {

                unix_times.push(i)
                i = moment(i).add(10, 'seconds').unix();// it will add 642 seconds in the current time and will give time in 03:35 PM format
              }

              _.each(d.data.Logs, function(i){
                console.log(i)
                active_unix.push(moment(i.Date).unix())
              });


              loggin_times = []
              _.each(unix_times, function(i){
                d = {}
                if(_.include(active_unix, i)) {
                  d["date"] = moment(i).unix()
                  d["status"] = "live"
                }
                else {
                  d["date"] = moment(i).unix()
                  d["status"] = "inactive"
                }
                loggin_times.push(d)
              });

              console.log(active_unix)
              console.log(unix_times)

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
