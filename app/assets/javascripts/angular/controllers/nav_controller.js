angular.module('Aircast.controllers')
  .controller('NavController',
  ['$scope', '$state', 'UserService', 'AuthService',
    function($scope, $state, UserService, AuthService) {

      $scope.logout = function() {
        a = UserService.logout()
        $state.go('login')
      }
      $scope.navLocations = false;
      $scope.isCollapsed = true;
      AuthService.currentUser()
        .then(function(d){
          if(d) {
            data = {
              UserID: d.UserID
            }

            if(d.UserID == 1) {
              $scope.navLocations = true;
            }
            UserService.getWallet(data)
              .then(function(d){
                $scope.wallet = d.data.Wallet
              });
            }
      });

      $scope.expand = true




}]);
