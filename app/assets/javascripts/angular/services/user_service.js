angular.module('Aircast.services')
  .service('UserService', ["$q", "$http", "$cookies", "$rootScope", "AuthService", "$state", function($q, $http, $cookies, $rootScope, AuthService, $state){
    var service = this;

    this.setUserFromFb = function(fb_credentials) {
      var d = $q.defer();
      $http({
        url: '/users/fb_login',
        method: 'POST',
        data: fb_credentials
      }).then(function(response){
        // var user = response.data.user;
        // user.auth_token = response.data.auth_token;
        // AuthService.setCurreantUser(user);
        d.resolve(response);
      })

      return d.promise;
    };

    this.getFbPicture = function(token) {
      var d = $q.defer();
      Facebook.api('/me', 'GET', {fields: 'name, email, picture.height(50).width(50)', access_token: token}, function(r) {
        data = {
          "id": r.id,
          "name": r.name,
          "picture": r.picture.data.url
        }
        d.resolve(data);
      });

      return d.promise;
    }

    this.getFbRole = function(token) {
      var d = $q.defer();
      Facebook.api('/me', 'GET', {fields: 'accounts.limit(100)', access_token: token}, function(response) {
        pages = response.accounts.data

        role = true

        _.each(pages, function(a){
          if(a.id== '1779236905645324') {
            if(_.contains(a.perms, 'ADMINISTER')) {
              role = true

              d.resolve(role);
            }
          }
        });


      });

      return d.promise;
    }

    this.signup = function(params) {
      var d = $q.defer();
      $http({
        url: '/users',
        method: 'POST',
        data: {
          user: params
        }
      }).then(function(response) {
        var user = response.data.user;
        user.auth_token = response.data.auth_token;
        AuthService.setCurrentUser(user);
        d.resolve(user);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    };

    this.signup1 = function(params) {
      var d = $q.defer();
      $http({
        url: 'http://54.254.248.115/AircastRegistration',
        method: 'POST',
        data: params
      }).then(function(response) {

        var user = response.data;
        AuthService.setCurrentUser(user);
        d.resolve(user);
      })

      return d.promise;
    };

    this.login = function(params) {
      $cookies.put('email',params.Email);
      var d = $q.defer();
      $http({
        url: 'http://54.254.248.115/AircastLogin',
        method: 'POST',
        data: params
      }).then(function(response) {
        if (response.status) {
          var user = response.data;
          AuthService.setCurrentUser(user);
          d.resolve(user);
        } else {
          d.reject(response);
        }
      })

      return d.promise;
    };

    this.logout = function() {
      $cookies.remove('user')
      $cookies.remove('email')
      return 'success'
    };

    this.getWallet = function(data) {

      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/AircastWallet',
        data: data,
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;

    }
}]);
