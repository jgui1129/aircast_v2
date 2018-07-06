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

  this.sites = function(id) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://palmsolutions-tools.herokuapp.com/api/api-uploader-sites-location',
        data: {
          id: id
        },
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }


  this.status_logs = function(location_name, startDate, endDate) {
    console.log(location_name)
    console.log(startDate)
    console.log(endDate)
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/aircast_location_monitoring.php?Location=' + location_name + '&StartDate='+ startDate + '&EndDate=' + endDate,
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

    this.paraKayGiro = function(data) {

      var u = data.url.split('?');
      var temp = 'video';
      if (data.Template == 'temp4') {
        temp = 'image';
      }

      $http({
        url: 'https://aircast-content-bot.herokuapp.com/send-approval',
        method: "POST",
        data: {
          info: {
            "campaign_id": data.CampaignID,
            "campaign_name": data.CampaignName,
            "type": temp,
            "preview": u[0],
            "start_date": data.StartDate,
            "end_date": data.EndDate,
            "days": data.Days,
            "timeslots": data.Timeslot,
            "locations": data.Location
          }
        }
      }).then(function(data){
        console.log("PARA KAY GIRO", data);
      })
    }


    this.rpi_upload = function(data) {
      var d = $q.defer();
      this.paraKayGiro(data);
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
        method: 'GET',
        url: 'http://gpdigital.crabdance.com/api/v0/aircast_status.php?location=all',
      }).then(function(data){
        d.resolve(data);
      });
      return d.promise;
    }

    this.location_reset = function(data) {
      console.log(data)
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'http://gpdigital.crabdance.com/api/v0/aircast_reboot.php?Action=reboot&RpiID=' + data,
      }).then(function(data){
        d.resolve(data);
      });
      return d.promise;
    }

}]);
