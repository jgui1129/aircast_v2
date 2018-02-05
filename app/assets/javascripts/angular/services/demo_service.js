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
        {
          "id": "night",
          "name": "Nighttime",
          "time": "9:00 PM - 6:00 AM"
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
          total: 8,
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
            },{
              "name": "HGS Alabang",
              "rpi_id": 15,
              "area": "Alabang",
              "quantity": 1
            }, {
              "name": "HGS Ecomm",
              "rpi_id": 37,
              "area": "Eastwood",
              "quantity": 1
            },{
              "name": "HGS Plaza E",
              "rpi_id": 26,
              "area": "Plaza E",
              "quantity": 1
            },{
              "name": "HGS South Key",
              "rpi_id": 27,
              "area": "South",
              "quantity": 1
            }, {
              "name": "HGS Aeon",
              "rpi_id": 25,
              "area": "Aeon",
              "quantity": 1
            }, {
              "name": "HGS Filinvest",
              "rpi_id": 41,
              "area": "Filinvest",
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
            },{
              "name": "HR Dept",
              "rpi_id": 4,
              "area": "Quezon City",
              "quantity": 1
            }
          ]
        },
        {
          id: "davids",
          name: "David's Salon",
          total: 13,
          areas: [
            {
              "name": "David's Salon Juno",
              "rpi_id": 23,
              "area": "Makati City",
              "quantity": 1
            },
            {
              "name": "David's Salon SM Makati",
              "rpi_id": 24,
              "area": "Makati City",
              "quantity": 1
            },
            {
              "name": "David's Shangrila",
              "rpi_id": 30,
              "area": "Makati City",
              "quantity": 1
            },{
              "name": "David's Salon Mega 1",
              "rpi_id": 31,
              "area": "Ortigas City",
              "quantity": 1
            },{
              "name": "David's Salon Mega 2",
              "rpi_id": 32,
              "area": "Ortigas City",
              "quantity": 1
            },{
              "name": "David's Salon Market Market",
              "rpi_id": 33,
              "area": "Makati City",
              "quantity": 1
            },{
              "name": "David's Salon Greenbelt",
              "rpi_id": 34,
              "area": "Makati City",
              "quantity": 1
            },
            {
              "name": "David's Salon Burgos Circle",
              "rpi_id": 35,
              "area": "Makati City",
              "quantity": 1
            },{
              "name": "David's Salon Valero",
              "rpi_id": 36,
              "area": "Makati City",
              "quantity": 1
            },
            {
              "name": "David's Makati Med",
              "rpi_id": 38,
              "area": "Makati City",
              "quantity": 1
            },{
              "name": "David's SM Light",
              "rpi_id": 48,
              "area": "Shaw Blvd",
              "quantity": 1
            },
            {
              "name": "David's Salon Alabang",
              "rpi_id": 55,
              "area": "Alabang City",
              "quantity": 1
            },
            {
              "name": "David's Salon Eastwood",
              "rpi_id": 57,
              "area": "Libis",
              "quantity": 1
            },
          ]
        },
        {
          id: "venetian",
          name: "Venetian",
          total: 3,
          areas: [
            {
              "name": "Venetian Empire Bar",
              "rpi_id": 63,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Venetian Cafe Delmar",
              "rpi_id": 64,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Venetian New Bombay",
              "rpi_id": 65,
              "area": "Quezon City",
              "quantity": 1
            }
          ]
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
              "quantity": 1
            },
            {
              "name": "The Yard Underground",
              "rpi_id": 22,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Chiebog",
              "rpi_id": 29,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Keatchen Food Park",
              "rpi_id": 42,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Village Eats",
              "rpi_id": 43,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Kalye",
              "rpi_id": 49,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Open Kitchen",
              "rpi_id": 22,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Open Kitchen Cubao",
              "rpi_id": 51,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Open Kitchen Congress",
              "rpi_id": 60,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Nova Food Park",
              "rpi_id": 22,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Open Kitchen",
              "rpi_id": 60,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Hangout",
              "rpi_id": 52,
              "area": "Quezon City",
              "quantity": 1
            }
          ]
        },
        {
          id: "gym",
          name: "Fitness Centers",
          total: 3,
          areas: [
            {
              "name": "Anytime Fitness Maginhawa",
              "rpi_id": 44,
              "area": "Alabang",
              "quantity": 3
            },{
              "name": "Anytime Fitness Eton",
              "rpi_id": 45,
              "area": "Quezon City",
              "quantity": 2
            }, {
              "name": "Anytime Fitness Paseo",
              "rpi_id": 46,
              "area": "Ortigas",
              "quantity": 5
            }
          ]
        },
        {
          id: "bonjour",
          name: "Bonjour",
          total: 10,
          areas: [
            {
              "name": "Bonjour Shaw",
              "rpi_id": 66,
              "area": "Alabang",
              "quantity": 1
            },{
              "name": "Bonjour Pasay",
              "rpi_id": 67,
              "area": "Quezon City",
              "quantity": 1
            }, {
              "name": "Bonjour Fairview",
              "rpi_id": 68,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour NLEX",
              "rpi_id": 69,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour Merville",
              "rpi_id": 70,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour Las Pinas",
              "rpi_id": 71,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour NAIA",
              "rpi_id": 72,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour West Service",
              "rpi_id": 73,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour New Port",
              "rpi_id": 74,
              "area": "Ortigas",
              "quantity": 1
            }, {
              "name": "Bonjour Sucat",
              "rpi_id": 75,
              "area": "Ortigas",
              "quantity": 1
            }
          ]
        },
        {
          id: "tua",
          name: "Universities",
          total: 3,
          areas: [
            {
              "name": "Trinity Library",
              "rpi_id": 77,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Trinity Registrar",
              "rpi_id": 78,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "Trinity Nursing Lobby",
              "rpi_id": 79,
              "area": "Quezon City",
              "quantity": 1
            }
          ]
        },
        {
          id: "fwd",
          name: "FWD",
          total: 4,
          areas: [
            {
              "name": "FWD 80",
              "rpi_id": 80,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "FWD 81",
              "rpi_id": 81,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "FWD 82",
              "rpi_id": 82,
              "area": "Quezon City",
              "quantity": 1
            },
            {
              "name": "FWD 83",
              "rpi_id": 82,
              "area": "Quezon City",
              "quantity": 1
            }
          ]
        },
        {
          id: "ikomai",
          name: "Ikomai",
          total: 1,
          areas: [
            {
              "name": "Ikomai",
              "rpi_id": 3,
              "area": "Makati",
              "quantity": 1
            }
          ]
        },
        {
          id: "office",
          name: "Office",
          total: 10,
          areas: [
            {
              "name": "Warner Main",
              "rpi_id": 61,
              "area": "BGC",
              "quantity": 3
            },
            {
              "name": "David's Salon Main",
              "rpi_id": 62,
              "area": "Makati City",
              "quantity": 1
            },
            {
              "name": "Bonjour Main",
              "rpi_id": 59,
              "area": "Mandaluyong",
              "quantity": 3
            }
          ]
        }
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
