angular.module('Aircast.services')
  .service('DemoService',['$http', '$q', function($http, $q) {
    this.days = function() {
      return [
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
    }
}]);
