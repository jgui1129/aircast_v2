angular.module('Aircast.services')
  .service('ReminderService',['$http', '$q', function($http, $q) {
    this.sms = function(data) {

        var d = $q.defer();
        $http({
          method: 'POST',
          url: 'http://jane-assistant.herokuapp.com/palm_patsy_pink',
          data: data,

        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
      }
}]);
