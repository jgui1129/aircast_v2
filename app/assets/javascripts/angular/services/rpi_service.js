angular.module('Aircast.services')
  .service('RpiService',['$http', '$q', function($http, $q) {

    this.advert = function(data) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'http://gpdigital.crabdance.com/api/v0/rpitv.php',
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.fileUrl = function(data) {
        var d = $q.defer();
        $http({
          method: 'POST',
          url: 'http://54.254.248.115/S3Post',
          data: data,

        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
      }

  this.upload = function(data) {
    var d = $q.defer();
    $http({
      method: 'PUT',
      url: data.url,
      data: data.file,
      headers: { 'Content-Type': data.type },
    }).then(function(response) {
        d.resolve(response);
      }, function(response) {
        error = 'Error status: ' + response.status
        d.resolve(error);
      },function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $rootScope.progress = progressPercentage + '% ';
      });

    return d.promise;
  }

}]);
