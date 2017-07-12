angular.module('Aircast.controllers')
  .controller('HomeController',
  ['$scope', '$state', 'NgMap',
    function($scope, $state, NgMap) {

      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
      });

      $scope.stats = [
        {
          "header": "Active Campaigns",
          "value_formatted": "3",
          "subheader": "Total Campaigns",
          "sub_value": 18
        }
      ]

      $scope.campaigns = [{
        "header": "Feel the Chill with Cola-Cola",
        "added": "01 July 2017",
        "status": "active",
        "length": "1:20",
        "total": 3,
        "sites": 20,
        "image": "http://i.imgur.com/cqW4AOl.png",
        "areas": [
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
      },{
        "header": "Chibog Time Roadtrip in Ilocos with Wil Dasovich and Coca-Cola",
        "added": "25 June 2017",
        "status": "active",
        "length": "1:22",
        "sites": 17,
        "image": "http://i.imgur.com/DYG0YIU.png",
        "areas": [
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
      }, {
        "header": "Make every meal time more special with COKE!",
        "added": "10 June 2017",
        "status": "paused",
        "length": "1:22",
        "sites": 43,
        "image": "http://i.imgur.com/IQnlzPv.png",
        "areas": [
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
      },{
        "header": "Araw-arawin ang Coca-Cola with the Suki Cap Promo!",
        "added": "04 June 2017",
        "status": "pending",
        "length": "0:45",
        "sites": 43,
        "image": "http://i.imgur.com/OdyNCZ5.png",
        "areas": [
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
      }
    ]

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

}]);
