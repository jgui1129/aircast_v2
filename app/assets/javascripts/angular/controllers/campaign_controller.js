angular.module('Aircast.controllers')
  .controller('CampaignController',
  ['$scope', '$state','ngDialog', 'RpiService', 'Upload',
    function($scope, $state, ngDialog, RpiService, Upload) {

      $scope.form_part = 1
      var video_divisor = 15
      var spot_limiter = 5

      //initialization
      $scope.campaign = {}
      $scope.campaign.price_per_spot = 25
      $scope.campaign.added_date_formatted = moment().format('l');
      $scope.all_locations = {
        selected:{}
      };
      $scope.next_disabled = false
      $scope.selected_locations = []

      $scope.$watch('selected_locations', function () {
        console.log($scope.selected_locations)
        x = 0
        _.each($scope.selected_locations, function(x) {
          subtotal = x.total * $scope.campaign.sum_repeats * $scope.campaign.weight * $scope.campaign.price_per_spot
          x = x + subtotal
        })
        $scope.campaign.total = x
      });
      $scope.all_shifts = {
        selected:{}
      };
      $scope.all_days = {
        selected:{}
      };
      $scope.aired = {}

      $scope.datePicker = {}
      $scope.datePicker.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
      $scope.all_days = {
        selected:{}
      };
      $scope.days = [
        {
          id: "0",
          "name": "Sun"
        },{
          id: "1",
          "name": "Mon"
        },{
          id:"2",
          "name": "Tue"
        },{
          id: "3",
          "name": "Wed"
        },{
          id: "4",
          "name": "Thu"
        },{
          id: "5",
          "name": "Fri"
        },{
          id:"6",
          "name": "Sat"
        }
      ]
      $scope.shifts = [
        {
          "id": "morning",
          "name": "Morning",
          "time": "6:00 AM - 11:00 AM"
        },
        {
          "id": "lunch",
          "name": "Lunch",
          "time": "11:00 AM - 1:00 PM"
        },
        {
          "id": "afternoon",
          "name": "Afternoon",
          "time": "1:00 PM - 5:00 PM"
        },
        {
          "id": "evening",
          "name": "Evening",
          "time": "5:00 PM - 9:00 PM"
        },
      ]
      $scope.layouts = [
        {
          name: "1 Division (Video)",
          tempId: "temp2",
          content: [
            {
              "label": "Side A",
              "filetype": "video/*",
              "name": "video",
              "type": "video"
            }
          ],
          url: "https://i.imgur.com/mYKALk9.png",
        },
        {
          name: "1 Division (Img/GIF)",
          tempId: "temp4",
          content: [
            {
              "label": "Side A",
              "filetype": "image/*",
              "name": "img/gif",
              "type": "gif"
            }
          ],
          url: "https://i.imgur.com/WslqN5q.png",
        },
      ];

      $scope.selected_layout = $scope.layouts[0]

      $scope.change_layout = function(layout) {
        $scope.selected_layout = layout
        $scope.campaign.content_type = $scope.selected_layout.content[0].type
      }

      $scope.locations = [
        {
          id: "rpidemo",
          name: "Gameplan Office",
          total: 8,
          areas: [
            {
              "name": "HR Dept",
              "rpi_id": 1,
              "area": "Quezon City",
              "quantity": 2
            },{
              "name": "Executive Dept",
              "rpi_id": 2,
              "area": "Quezon City",
              "quantity": 3
            }, {
              "name": "SSI Dept",
              "rpi_id": 3,
              "area": "Quezon City",
              "quantity": 3
          }]
        },
        {
          id: "school",
          name: "Univesities",
          total: 8,
          areas: [
            {
              "name": "University of the Philippines",
              "rpi_id": 4,
              "area": "Quezon City",
              "quantity": 2
            },{
              "name": "Ateneo de Manila",
              "rpi_id": 5,
              "area": "Quezon City",
              "quantity": 3
            }, {
              "name": "La Salle University",
              "rpi_id": 6,
              "area": "Makati",
              "quantity": 3
          }],
        },
        {
          id: "foodpark",
          name: "Food Park",
          total: 9,
          areas: [
            {
              "name": "The Yard",
              "rpi_id": 4,
              "area": "Quezon City",
              "quantity": 2
            },{
              "name": "Katorini",
              "rpi_id": 5,
              "area": "Ortigas",
              "quantity": 3
            }, {
              "name": "Game Over",
              "rpi_id": 6,
              "area": "Makati",
              "quantity": 4
            }
          ],
        },
        {
          id: "gym",
          name: "Fitness Centers",
          total: 10,
          areas: [
            {
              "name": "Gold's Gym Alabang",
              "rpi_id": 7,
              "area": "Alabang",
              "quantity": 3
            },{
              "name": "Gold's Gym Katipunan",
              "rpi_id": 8,
              "area": "Quezon City",
              "quantity": 2
            }, {
              "name": "Fitness First",
              "rpi_id": 9,
              "area": "Ortigas",
              "quantity": 5
            }
          ]
        },
        {
          id: "bpo",
          name: "BPO",
          total: 10,
          areas: [
            {
              "name": "The Results",
              "rpi_id": 10,
              "area": "Mandaluyong",
              "quantity": 3
            },{
              "name": "HGS Alabang",
              "rpi_id": 11,
              "area": "Alabang",
              "quantity": 2
            }, {
              "name": "Convergys Ortigas",
              "rpi_id": 12,
              "area": "Ortigas",
              "quantity": 5
            }
          ]
        },
      ]

      $scope.go_location = function(loc) {
        $scope.clicked_location = loc
        ngDialog.openConfirm({ templateUrl: 'shared/location.html',
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

      $scope.next =function() {
        // _.each($scope.campaign.layout.content, function(x){
        //   type:
        //   extension = name.split('.').pop();
        //   x["ext"] = extension;
        // });

        $scope.next_disabled = true
        payload = []
        d = {}
        d["ext"] = $scope.campaign.extension
        d["type"] = $scope.campaign.content_type
        payload.push(d)

        data = {
          UserId: 1,
          Template: $scope.campaign.layout.tempId,
          CampaignName: $scope.campaign.name,
          payload: payload,
          Weight: $scope.campaign.weight
        }

        RpiService.fileUrl(data)
          .then(function(d){
            console.log(d)
            $scope.campaign.fileUrl = d.data.FileUrl
            $scope.form_part = $scope.form_part + 1
            counter_f = 1
            count_files = d.data.FileUrl.length
            // _.each(d.data.FileUrl, function(x){
            //   x.file = $scope.campaign[x.type]
            //
            //   RpiService.upload(x)
            //     .then(function(res) {
            //
            //       x.uploaded = true
            //
            //       if(counter_f == count_files) {
            //
            //         isUploaded(d.data, count_files)
            //       }
            //       counter_f++
            //   })
            // });
        });

      }

      $scope.dateRangeOptions = {
        eventHandlers : {
            'apply.daterangepicker' : function() {
                $scope.campaign.startDate_formatted = moment($scope.datePicker.date.startDate).format('MMM D')
                $scope.campaign.endDate_formatted = moment($scope.datePicker.date.endDate).format('MMM D')
            }
        }
      };

      $scope.times_aired = function() {
        aired_content = []
        $scope.campaign.aired_formatted = _.keys($scope.aired)
        _.each($scope.campaign.aired_formatted, function(x) {
          d = {}
          d["name"] = x
          d["repeat"] = $scope.aired[x]
          aired_content.push(d)
        });
        $scope.campaign.aired_content = aired_content
        $scope.campaign.aired_total = _.reduce(_.values($scope.aired), function(memo, num){ return memo + num; }, 0);
      }

      $scope.checkedLocation = function() {
        selected_locations = []
        _.each(_.values($scope.all_locations.selected), function(x) {
           loc = _.filter($scope.locations, function(num){ return num.id == x; });
           selected_locations.push(loc)
        })
        $scope.selected_locations = _.flatten(selected_locations)

      }

      $scope.launch = function() {
        $scope.campaign.timeslot = _.values($scope.all_shifts.selected)
        $scope.campaign.days = _.values($scope.all_days.selected)
        $scope.campaign.startDate = moment($scope.datePicker.date.startDate).unix()
        $scope.campaign.endDate = moment($scope.datePicker.date.endDate).unix();
        $scope.campaign.aired = $scope.campaign.aired_content

        data = {
          "CampaignName": $scope.campaign.name,
          "template": $scope.campaign.layout.tempId,
          "locations": $scope.selected_locations,
          "StartDate": $scope.campaign.startDate,
          "EndDate": $scope.campaign.endDate,
          "days": $scope.campaign.days,
          "aired": $scope.campaign.aired,
          "aired_total": $scope.campaign.aired_total,
          "weight": $scope.campaign.weight,
          "price_per_spot": $scope.campaign.price_per_spot,
          "fileUrl": $scope.campaign.fileUrl[0].url,
          "file": $scope.campaign.file
        }

        // RpiService.upload(x)
        //   .then(function(res) {
        //
        //     x.uploaded = true
        //
        //     if(counter_f == count_files) {
        //
        //       isUploaded(d.data, count_files)
        //     }
        //     counter_f++
        // })



        console.log(data)
      }


}]);
