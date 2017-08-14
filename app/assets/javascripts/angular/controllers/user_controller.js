angular.module('Aircast.controllers')
  .controller('UserController',
  ['$scope', '$state', '$interval', 'UserService', 'AuthService',
    function($scope, $state, $interval, UserService, AuthService) {



      AuthService.currentUser()
        .then(function(d){
          console.log(d)
          if(d) {
            $state.go('nav.home')
          }
      });

      background_images = ["http://i.imgur.com/h6c9tK5.jpg", "http://i.imgur.com/ywyEgoW.png", "http://i.imgur.com/v8ohWLN.png"]
      $scope.background_image = background_images[0]
      index = 0

      $scope.user = {}
      $scope.register = {}
      $interval(function(){
        if(index < 2) {
          index = index + 1
        }
        else {
          index = 0
        }
        $scope.background_image = background_images[index]
      }, 3000, 0);

      $scope.login = function() {
        data = $scope.user
        UserService.login(data)
          .then(function(d){
            console.log(d)
            if(d.error == 'username or password incorrect') {
              $scope.error = true
            }
            else {
              $state.go('nav.home')
            }

        });
      }
      $scope.error = false
      $scope.signup = function() {
        $scope.register.Birthday = moment($scope.register.Birthday).unix()
        data = $scope.register
        UserService.signup1(data)
          .then(function(d){
            $state.go('nav.home')
        });
      }
}]);
