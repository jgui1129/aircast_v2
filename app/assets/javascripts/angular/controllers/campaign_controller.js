angular.module('Aircast.controllers')
  .controller('CampaignController',
  ['$scope', '$state','ngDialog', 'RpiService', 'Upload', 'DemoService', '$rootScope', 'AuthService', 'ReminderService',
    function($scope, $state, ngDialog, RpiService, Upload, DemoService, $rootScope, AuthService, ReminderService) {

      $scope.form_part = 1
      var video_divisor = 15
      var spot_limiter = 5
      $scope.warning = false
      $rootScope.progress = ""
      //initialization
      $scope.campaign = {}
      $scope.campaign.sum_of_days = 1
      $scope.campaign.price_per_spot = 25
      $scope.campaign.weight = 1
      $scope.campaign.aired_total = 1
      $scope.campaign.duration = "NA"
      $scope.campaign.added_date_formatted = moment().format('l');
      $scope.all_locations = {
        selected:{}
      };
      $scope.next_disabled = false
      $scope.launch_disabled = false
      $scope.selected_locations = []

      //add here

      // console.log('hello')
      // RpiService.sites()
      //   .then(function(d){
      //     $scope.locations = d.data


      //     AuthService.currentUser()
      //       .then(function(d){

      //         console.log('JERIC USER: ', d)

      //         if(!d) {
      //           $state.go('login')
      //         }
      //         else {
      //           if(d.UserID == 14) {

      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'tua'; });
      //           }

      //           else if (d.UserID == 18) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'fwd'; });
      //           }

      //           else if (d.UserID == 29) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'pwu'; });
      //           }
      //           else if (d.UserID == 30) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'elorde'; });
      //           }
      //           else if (d.UserID == 31) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'teresitas'; });
      //           }

      //           else if (d.UserID == 32) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'elorde2'; });
      //           }
      //           else if (d.UserID == 33) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'elorde3'; });
      //           }
      //           else if (d.UserID == 34) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'elorde4'; });
      //           }
      //           else if (d.UserID == 35) {
      //             $scope.locations = _.filter($scope.locations, function(num){ return num.id == 'elorde5'; });
      //           }

      //           $scope.campaign.user = d
      //         }
      //     });
      // });

        AuthService.currentUser()
            .then(function(d){
              $scope.campaign.user = d

              if(!d) {
                $state.go('login')
              }
              else {

                  RpiService.sites(d.UserID)
                    .then(function(loc){
                      $scope.locations = loc.data
                    });


              }
          })



      $scope.$watch('selected_locations', function () {

        x = 0
        _.each($scope.selected_locations, function(x) {
          subtotal = x.total * $scope.campaign.aired_total * $scope.campaign.weight * $scope.campaign.price_per_spot
          x = x + subtotal
        })
        $scope.campaign.locations = $scope.selected_locations
        calculate_total()


      });

      calculate_total = function() {
        sum = 0
        _.each($scope.campaign.locations, function(x){
          sum = sum + x.total
        })
        $scope.campaign.total = sum*$scope.campaign.aired_total*$scope.campaign.price_per_spot*$scope.campaign.weight*$scope.campaign.sum_of_days
        $scope.campaign.total_spots = $scope.campaign.total/25
      }
      $scope.all_shifts = {
        selected:{}
      };
      $scope.all_shifts.selected = {
        morning: "morning"
      }


      $scope.all_days = {
        selected:{}
      };
      $scope.aired = {}

      $scope.aired = {
        Morning: 1
      }
      $scope.campaign.aired_content = [{
        name: "Morning",
        repeat: 1
      }]

      $scope.datePicker = {}
      $scope.datePicker.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
      $scope.all_days = {
        selected:{}
      };
      $scope.campaign.startDate_formatted = moment($scope.datePicker.date.startDate).format('MMM D')
      $scope.campaign.endDate_formatted = moment($scope.datePicker.date.endDate).format('MMM D')
      $scope.days = DemoService.days()
      $scope.shifts = DemoService.shifts()
      $scope.layouts = DemoService.layouts()


      AuthService.c
      $scope.selected_layout = $scope.layouts[0]
      $scope.campaign.content_type = $scope.selected_layout.content[0].type

      $scope.change_layout = function(layout) {
        $scope.selected_layout = layout
        $scope.campaign.content_type = $scope.selected_layout.content[0].type

      }



      $scope.go_location = function(loc) {
        $scope.clicked_location = loc
        ngDialog.openConfirm({
          templateUrl: 'shared/location.html',
            className: 'ngdialog-theme-default',
            width: '750px',
            controller: 'ModalController',
            scope: $scope,

        }).then(function (location) {
          index = _.findIndex($scope.selected_locations, function(item) { return item.id == location.id })
          location["areas"] = location["selected_areas"]
          $scope.selected_locations[index] = location

        }, function (value) {
            //Do something
        });
      }



      $scope.upload = function(x) {
        $scope.campaign.file = x
        $scope.campaign.extension = x.name.split('.').pop()
        $scope.campaign.duration = "N/A"

        if($scope.campaign.content_type == 'gif') {
          $scope.campaign.weight = 1
        }
        else {
          Upload.mediaDuration(x).then(function(durationInSeconds){
            $scope.campaign.weight = Math.floor(durationInSeconds/video_divisor)
            mod = durationInSeconds%15
            if(mod > spot_limiter) {
              $scope.campaign.weight = $scope.campaign.weight + 1
            }
            durationInSeconds = parseInt(durationInSeconds)
            var minutes = Math.floor(durationInSeconds/ 60);
            var seconds = durationInSeconds - minutes * 60;
            $scope.campaign.duration = minutes + ':' + seconds + ' minutes'
          })
        }
      }

      $scope.delete = function() {
        $scope.campaign.file = ""
      }

      $scope.previous = function() {
        $scope.form_part = 1
      }

      $scope.next =function() {

        if($scope.campaign.file) {

          AuthService.currentUser()
            .then(function(user) {

              _.each($scope.campaign.layout.content, function(x){
                extension = name.split('.').pop();
                x["ext"] = extension;
              });

              $scope.next_disabled = true
              payload = []
              d = {}

              d["ext"] = $scope.campaign.extension
              d["type"] = $scope.campaign.content_type
              payload.push(d)


              data = {
                UserID: user.UserID,
                Template: $scope.campaign.layout.tempId,
                CampaignName: $scope.campaign.name,
                payload: payload,
                Weight: $scope.campaign.weight
              }

              RpiService.fileUrl(data)
                .then(function(d){

                  $scope.campaign.fileUrl = d.data.FileUrl
                  $scope.form_part = $scope.form_part + 1
                  $scope.campaign.id = d.data.CampaignID
                  counter_f = 1
                  count_files = d.data.FileUrl.length
                  // _.each(d.data.FileUrl, function(x){
                  //   x.file = $scope.campaign[x.type]
                  //
                  //   RpiService.upload(x)
                  //     .then(function(res) {
                  //       //
                  //       // x.uploaded = true
                  //       //
                  //       // if(counter_f == count_files) {
                  //       //
                  //       //   isUploaded(d.data, count_files)
                  //       // }
                  //       // counter_f++
                  //   })
                  // });
              });
            });
        }
        else {
          $scope.warning = true
        }

      }

      $scope.dateRangeOptions = {
        eventHandlers : {
            'apply.daterangepicker' : function() {
                $scope.campaign.startDate_formatted = moment($scope.datePicker.date.startDate).format('MMM D')
                $scope.campaign.endDate_formatted = moment($scope.datePicker.date.endDate).format('MMM D')
                $scope.checkedDays()
                calculate_total()
            }
        }
      };

      $scope.hello = function() {

        $scope.campaign.aired_formatted = []
        _.each(_.keys($scope.all_shifts.selected), function(y) {
          d = {}
          d["name"] = y
          $scope.campaign.aired_formatted.push(d)
        })
        calculate_total()
      }

      $scope.times_aired = function() {
        aired_content = []
        _.each(_.keys($scope.aired), function(x) {
          d = {}
          d["name"] = x
          d["repeat"] = $scope.aired[x]
          aired_content.push(d)
        });
        $scope.campaign.aired_content = aired_content

        $scope.campaign.aired_total = _.reduce(_.values($scope.aired), function(memo, num){ return memo + num; }, 0);
        calculate_total()
      }

      $scope.checkedLocation = function() {
        selected_locations = []
        _.each(_.values($scope.all_locations.selected), function(x) {
           loc = _.filter($scope.locations, function(num){ return num.id == x; });
           selected_locations.push(loc)
        })
        $scope.selected_locations = _.flatten(selected_locations)
      }

      $scope.checkedDays = function() {
        selected_days_array = []
        _.each(_.keys($scope.all_days.selected), function(x) {
          if($scope.all_days.selected[x] != "") {
           loc = _.filter($scope.days, function(num){ return num.name == x; });
           selected_days_array.push(loc)
          }
        })
        selected_days_array = _.flatten(selected_days_array)
        number_of_day_array = []
        _.each(selected_days_array, function(x) {
          number_of_day = DemoService.days_calculate($scope.datePicker.date.startDate,$scope.datePicker.date.endDate,x.id)
          number_of_day_array.push(number_of_day)
          d = {}
        })

        $scope.campaign.sum_of_days = number_of_day_array.reduce(function(pv, cv) { return pv + cv; }, 0);
        calculate_total()
      }

      $scope.launch = function() {
        $scope.campaign.timeslot = _.values($scope.all_shifts.selected)
        $scope.campaign.days = _.values($scope.all_days.selected)
        $scope.campaign.startDate = moment($scope.datePicker.date.startDate).unix()
        $scope.campaign.endDate = moment($scope.datePicker.date.endDate).unix();
        $scope.campaign.aired = $scope.campaign.aired_content

        data = {
          "CampaignName": $scope.campaign.name,
          "Template": $scope.campaign.layout.tempId,
          "Location": $scope.selected_locations,
          "StartDate": $scope.campaign.startDate,
          "EndDate": $scope.campaign.endDate,
          "Days": $scope.campaign.days,
          "Timeslot": $scope.campaign.aired,
          "aired_total": $scope.campaign.aired_total,
          "weight": $scope.campaign.weight,
          "price_per_spot": $scope.campaign.price_per_spot,
          "url": $scope.campaign.fileUrl[0].url,
          "FileUrl": $scope.campaign.fileUrl,
          "file": $scope.campaign.file,
          "CampaignID": $scope.campaign.id
        }

        upload_data = {
          "file": $scope.campaign.file,
          "url": $scope.campaign.fileUrl[0].url,
        }

        $scope.launch_disabled = true
        $scope.progressbar = true
        RpiService.upload(upload_data)
          .then(function(res) {
            RpiService.rpi_upload(data)
              .then(function(result) {
                // $scope.loading = false
                console.log(result)
                console.log($scope.campaign)
                if($scope.campaign.user.UserID == 11) {

                  reminders = [
                    {
                      "mobile": '639175396126',
                      "message": "Awesome Anna! You've successfully uploaded your content. In a while, it will be up and running. Thank you!",
                    },
                    {
                      "mobile": '639175314928',
                      "message": "Awesome Anna! You've successfully uploaded your content. In a while, it will be up and running. Thank you!",
                    },
                    // {
                    //   "mobile": '639173253810',
                    //   "message": "User:" + $scope.campaign.user.UserID + ' just uploaded a content.'
                    // },
                    // {
                    //   "mobile": '639175314928',
                    //   "message": 'Awesome! You have successfully uploaded your ' + $scope.campaign.name
                    // },
                  ]
                }
                else {
                  reminders = [
                    {
                      "mobile": '639175314928',
                      "message": "User:" + $scope.campaign.user.UserID + ' just uploaded a content.'
                    },
                    {
                      "mobile": '639175314928',
                      "message": "User:" + $scope.campaign.user.UserID + ' just uploaded a content.'
                    },
                    // {
                    //   "mobile": '639173253810',
                    //   "message": "User:" + $scope.campaign.user.UserID + ' just uploaded a content.'
                    // },
                    // {
                    //   "mobile": '639175314928',
                    //   "message": 'Awesome! You have successfully uploaded your ' + $scope.campaign.name
                    // },
                  ]
                }
                ctr = 1
                _.each(reminders, function(x) {

                  if(ctr <= reminders.length) {
                    ReminderService.sms(x)
                      .then(function(d){
                        console.log(d)
                        $state.go('nav.home')
                        ctr++
                      });
                  }
                  if(ctr == reminders.length) {
                    // progressbar.complete();


                  }

                });
            })
        })
        console.log(data)
      }


}]);
