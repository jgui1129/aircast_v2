angular.module('Aircast.services')
  .service('RpiService',['$http', '$q', 'Upload', '$rootScope', function($http, $q, Upload, $rootScope) {

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
      method: "PUT",
      url: data.url,
      data: data.file,
      headers: { 'Content-Type': data.type },
      uploadEventHandlers: {
        progress: function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $rootScope.progress = progressPercentage + '%'
          
        }
      },
    }).then(function(response) {
        d.resolve(response);
      });

    return d.promise;
  }

    this.rpi_upload = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/CampaignPost',
        data: data,
      }).then(function(data){
        d.resolve(data);
      }, function(evt) {
                var progressPercentage = parseInt(100.0 *
                  evt.loaded / evt.total);
                $scope.progress = progressPercentage + '% ';
                console.log($scope.progress)
              });

      return d.promise;
    }

    this.getCampaigns = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/AircastStatus',
        data: data,
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.switchCampaign = function(data) {

      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/AircastSwitch',
        data: data,
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;

    }

    this.approveCampaign = function(data) {

      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/AircastApprovalSwitch',
        data: data,
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;

    }

    this.locations = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://54.254.248.115/AircastApprovalSwitch',
        data: data,
      }).then(function(data){
        d.resolve(data);
      });
      return d.promise;
    }

}]);
