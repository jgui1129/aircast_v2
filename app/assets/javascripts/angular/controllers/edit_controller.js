Aircast.controller('EditController', ['$scope', 'RpiService', '$stateParams', 'AuthService', '$sce',
  function($scope, RpiService, $stateParams, AuthService, $sce) {

    AuthService.currentUser()
      .then(function(d) {
        if(d.UserID == 1) {
          $scope.isAdmin = true
        }
        data = {
          UserID: d.UserID,
        }
        RpiService.getCampaigns(data)
          .then(function(d){
            campaign = _.filter(d.data, function(i){ return i.CampaignID == $stateParams.campaignID; });
            if(campaign[0].Preview.indexOf(".mp4") !== -1)  {
              campaign[0].type = 'video'
            }
            else {
              campaign[0].type = 'image'
            }

            _.each(campaign[0].Location, function(i) {
              _.each(i.areas, function(u) {
                if(u.isEnabled == 1) {
                  $scope.all_enabled_areas.selected[u.rpi_id] = true
                }
              })
            })

            console.log($scope.all_enabled_areas.selected)

            $scope.campaign = campaign[0]
            console.log($scope.campaign)
            url = $scope.campaign.Preview

            $scope.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl(url), type: "video/mp4"},
                ],
                tracks: [
                    {
                        src: "pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                  url: "https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css"
                },
                plugins: {
                    controls: {
                        autoHide: false
                    }
                }
            };

          });

      })

    $scope.all_enabled_areas = {
      selected:{}
    };

    $scope.approval = function(loc_id, rpi_id, enabled) {

      _.each($scope.campaign.Location, function(u) {
        _.each(u.areas, function(i) {
          if(i.rpi_id == rpi_id) {
            if(enabled == true) {
              i.isEnabled = 1
            }
            else {
              i.isEnabled = 0
            }
          }
        })
      })
    }

    $scope.save = function() {
      RpiService.switchCampaign($scope.campaign)
        .then(function(d){
          console.log(d)
        });
    }
}])
