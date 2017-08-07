angular.module('Aircast.controllers')
  .controller('HomeController',
  ['$scope', '$state', 'NgMap', 'RpiService', 'ngDialog', 'AuthService', '$rootScope',
    function($scope, $state, NgMap, RpiService, ngDialog, AuthService, $rootScope) {

      NgMap.getMap().then(function(map) {
      });

      $rootScope.gmap_api = 'https://maps.googleapis.com/maps/api/js?key='+'AIzaSyC41pxTAW-h6B9HlesIM4iW5ZupZ0y4MmYcontent_copy'

      AuthService.currentUser()
        .then(function(d){
          if(!d) {
            $state.go('login')
          }
      });

      $scope.isAdmin = false


      $scope.edit = function(campaign) {
        $state.go('nav.edit', {campaignID: campaign.CampaignID})
      }


      AuthService.currentUser()
        .then(function(d) {
          console.log(d.UserID)
          if(d.UserID == 1) {
            $scope.isAdmin = true
          }


          data = {
            UserID: d.UserID,
          }

          RpiService.getCampaigns(data)
            .then(function(d){


                _.each(d.data, function(x) {
                  x.StartDate = moment(x.StartDate).format('L')
                  x.EndDate = moment(x.EndDate).format('L')
                  x.total_tvs = x.Location[0].areas.length
                  x.all_enabled = _.filter(x.Location[0].areas, function(i){ return i.isEnabled == 1; });
                  x.all_ready = _.filter(x.Location[0].areas, function(i){ return i.isReady == 1; });
                })
                $scope.campaigns = d.data.reverse()
                _.each($scope.campaigns, function(x) {

                  if(x.isApproved == 1) {
                    x.status = "1"
                  }
                  else {
                    x.status = "0"
                  }
                  if(x.all_enabled.length>0) {
                    $scope.all_enabled_campaigns.selected[x.CampaignID] = true
                  }
                  if(x.isApproved == 0) {
                    $scope.all_approved_campaigns.selected[x.CampaignID] = false
                  }
                  else {
                      $scope.all_approved_campaigns.selected[x.CampaignID] = true
                  }

                  if(x.Preview.indexOf(".mp4") !== -1)  {
                    x.Preview = 'http://i.imgur.com/xckPPS5.jpg'
                  }

                })

                console.log($scope.campaigns)



          });
        })
      $scope.all_enabled_campaigns = {
        selected:{}
      };

      $scope.all_approved_campaigns = {
        selected:{}
      };

      $scope.approval =function(CampaignID,y) {
        if(y) {
          isApproved = 1

        }
        else {
          isApproved = 0
        }
        data = {
          CampaignID:CampaignID,
          isApproved:isApproved
        }

        RpiService.approveCampaign(data)
          .then(function(d){

            _.each($scope.campaigns, function(x) {
              if(x.CampaignID == d.data.CampaignID) {
                x.isApproved =d.data.isApproved

              }
            })

          });
      }




      $scope.live =function(CampaignID,y) {
        if(y) {
          $scope.turning = "turn on"
        }
        else {
          $scope.turning = "turn off"
        }

        ngDialog.openConfirm({ templateUrl: 'shared/confirm.html',
                        className: 'ngdialog-theme-default',
                        width: '600px',
                        scope: $scope,

                    }).then(function (status) {
                        campaign = _.filter($scope.campaigns, function(i){ return i.CampaignID == CampaignID; });

                        console.log(campaign[0])
                        _.each(campaign[0].Location, function(u) {
                          _.each(u.areas, function(i) {

                            i.isEnabled = y
                            console.log(i.isEnabled)
                          })
                        })
                        data = {
                          "CampaignID": CampaignID,
                          "Location": campaign[0].Location
                        }
                        RpiService.switchCampaign(data)
                          .then(function(d){
                            console.log(d)
                          });
                    }, function (value) {
                      $scope.all_enabled_campaigns.selected[CampaignID] = !y
                    });
      }









}]);
