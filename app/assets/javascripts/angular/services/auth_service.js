angular.module('Aircast.services')
  .service('AuthService', ["$q", "$rootScope", "$cookies" , function($q, $rootScope, $cookies) {

    var service = this;

    this._user = null;

    this.setCurrentUser = function(u) {
      service._user = u;
      $rootScope.isLoggedIn = true;
      $cookies.putObject('user', u);
    };

    this.removeCurrentUser = function() {
      service._user = null;
      $rootScope.isLoggedIn = false;
      $cookies.remove('user');
    };

    this.currentUser = function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else if ($cookies.getObject('user')) {
        service.setCurrentUser($cookies.getObject('user'));
        d.resolve(service._user);
      } else {
        d.resolve(null);
      }
      return d.promise;
    };

  }]);
