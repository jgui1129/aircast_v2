angular.module('Aircast.services')
  .service('DemoService',['$http', '$q', function($http, $q) {
    this.days = function() {
      return [
        {
          id: 0,
          "name": "Sun"
        },{
          id: 1,
          "name": "Mon"
        },{
          id:2,
          "name": "Tue"
        },{
          id:3,
          "name": "Wed"
        },{
          id: 4,
          "name": "Thu"
        },{
          id: 5,
          "name": "Fri"
        },{
          id:6,
          "name": "Sat"
        }
      ]
    }
    this.shifts = function() {
      return [
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
    }
    this.layouts = function() {
      return [
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
    }
    this.locations = function() {
      return [
        {
          id: "hgs",
          name: "Hinduja Global Solutions",
          total: 2,
          areas: [
            {
              "name": "HGS 1800",
              "rpi_id": 19,
              "area": "Eastwood",
              "quantity": 1
            },{
              "name": "HGS 1880",
              "rpi_id": 20,
              "area": "Eastwood",
              "quantity": 1
            },,{
              "name": "HGS Ecomm",
              "rpi_id": 20,
              "area": "Eastwood",
              "quantity": 1
            }]
        },
        {
          id: "rpidemo",
          name: "Coke Trade Fair",
          total: 4,
          areas: [
            {
              "name": "Office",
              "rpi_id": 1,
              "area": "Quezon City",
              "quantity": 1
            },{
              "name": "Terminal",
              "rpi_id": 2,
              "area": "Quezon City",
              "quantity": 1
            }, {
              "name": "School",
              "rpi_id": 3,
              "area": "Quezon City",
              "quantity": 1
            }, {
              "name": "HR Dept",
              "rpi_id": 4,
              "area": "Quezon City",
              "quantity": 1
            }]
            // }, {
            //   "name": "HR Dept",
            //   "rpi_id": 4,
            //   "area": "Quezon City",
            //   "quantity": 1
            // }]
        },
        {
          id: "davids",
          name: "David's Salon",
          total: 1,
          areas: [
            {
              "name": "David's Salon Valero Branch",
              "rpi_id": 18,
              "area": "Makati City",
              "quantity": 1
            }, {
              "name": "David's Salon Juno Branch",
              "rpi_id": 23,
              "area": "Makati City",
              "quantity": 1
            }, {
              "name": "David's Salon SM Makati Branch",
              "rpi_id": 24,
              "area": "Makati City",
              "quantity": 1
            }, {
              "name": "Aircast Demo",
              "rpi_id": 6,
              "area": "Quezon City",
              "quantity": 1
            }]
        },
        {
          id: "universities",
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
            }],
        },
        {
          id: "school",
          name: "Aircast Demo",
          total: 1,
          areas: [
            {
              "name": "Aircast TV",
              "rpi_id": 6,
              "area": "Makati",
              "quantity": 1
          }],
        },
        {
          id: "foodpark",
          name: "Food Park",
          total: 9,
          areas: [
            {
              "name": "The Yard Xavierville",
              "rpi_id": 21,
              "area": "Quezon City",
              "quantity": 2
            },
            {
              "name": "The Yard Underground",
              "rpi_id": 22,
              "area": "Quezon City",
              "quantity": 2
            },
            // {
            //   "name": "Katorini",
            //   "rpi_id": 5,
            //   "area": "Ortigas",
            //   "quantity": 3
            // }, {
            //   "name": "Game Over",
            //   "rpi_id": 6,
            //   "area": "Makati",
            //   "quantity": 4
            // }
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
              "rpi_id": 14,
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
    }

    this.days_calculate = function(d1, d2, isoWeekday) {
      // ensure we have valid moment instances
      d1 = moment(d1);
      d2 = moment(d2);
      // figure out how many days to advance to get to the next
      // specified weekday (might be 0 if d1 is already the
      // specified weekday).
      var daysToAdd = ((7 + isoWeekday) - d1.isoWeekday()) % 7;
      var nextTuesday = d1.clone().add(daysToAdd, 'days');
      // if we are already passed the end date, there must not
      // be any of that day in the given period.
      if (nextTuesday.isAfter(d2)) {
          return 0;
      }
      // otherwise, just return the whole number of weeks
      // difference plus one for the day we already advanced to
      var weeksBetween = d2.diff(nextTuesday, 'weeks');
      return weeksBetween + 1;
  }

  // Parameters: location_id
}]);
