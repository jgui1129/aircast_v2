angular.module('Aircast.controllers')
  .controller('NavController',
  ['$scope', '$state', 'UserService', 'AuthService',
    function($scope, $state, UserService, AuthService) {

      $scope.logout = function() {
        UserService.logout()
        $state.go('login')
      }

      AuthService.currentUser()
        .then(function(d){
          data = {
            UserID: d.UserID
          }
          UserService.getWallet(data)
            .then(function(d){
              console.log(d)
              $scope.wallet = d.data.Wallet
            });
      });




}]);
