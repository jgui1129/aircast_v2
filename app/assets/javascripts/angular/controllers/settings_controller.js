Aircast.controller('SettingsController', ['$scope', '$location', 'DemoService', 'ngDialog',
  function($scope, $location, DemoService, ngDialog) {

    $scope.selection = 'all';

    $scope.tab = function(selected) {
      $scope.selection = selected
    }

    $scope.tables = [
      {
        "date": "11/08/16",
        "name": "Rolex Watch",
        "bidders": 1003,
        "bids": 300,
        "total": 300,
        "expiry": "expired",
        "status": "Won"
      },
      {
        "date": "11/08/16",
        "name": "Rolex Watch",
        "bidders": 1003,
        "bids": 300,
        "total": 300,
        "expiry": "expired",
        "status": "Won"
      },
      {
        "date": "11/08/16",
        "name": "Rolex Watch",
        "bidders": 1003,
        "bids": 300,
        "total": 300,
        "expiry": "expired",
        "status": "Won"
      },
      {
        "date": "11/08/16",
        "name": "Rolex Watch",
        "bidders": 1003,
        "bids": 300,
        "total": 300,
        "expiry": "expired",
        "status": "Won"
      },
      {
        "date": "11/08/16",
        "name": "Rolex Watch",
        "bidders": 1003,
        "bids": 300,
        "total": 300,
        "expiry": "expired",
        "status": "Won"
      },
    ]

    $scope.history = [
      {
        "date": "11/08/16",
        "coins": 300,
        "cost": "P1.00",
        "total": "P300.00",
        "method": "card - *8000"
      },
      {
        "date": "11/08/16",
        "coins": 300,
        "cost": "P1.00",
        "total": "P300.00",
        "method": "card - *8000"
      },
      {
        "date": "11/08/16",
        "coins": 300,
        "cost": "P1.00",
        "total": "P300.00",
        "method": "card - *8000"
      },
      {
        "date": "11/08/16",
        "coins": 300,
        "cost": "P1.00",
        "total": "P300.00",
        "method": "card - *8000"
      }
    ]
}])
