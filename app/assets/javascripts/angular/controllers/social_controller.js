angular.module('Aircast.controllers')
  .controller('SocialController',
  ['$scope', '$state', 'RpiService', 'AuthService','$q','$http',
    function($scope, $state, RpiService, AuthService,$q,$http) {

    var fb_post = {
      access_token: 'EAAKAyZCmFO8EBAPQVWKgotd8I6cZAnRVjZBZCy74gAXQ7zwryKOV0gWdc9LlDmYvERfq5DSy7z9X9gpmEw5NJcxbZBjEZCuLZBZAC2eOLvuevnXRNdKtC7SVmJpbV1QHzdwPOCMfkXyKfSgN3Ew9aUnllAabS988tSBq2lU4hBlxmDBeZBBTZAlrlu',
      page_id: "fwdlife.ph",
      api_version: 'v2.0',
      fb_limit: 100
    }


      var url = 'https://graph.facebook.com/'+fb_post.api_version+'/'+fb_post.page_id+'/feed?fields=id,created_time,message,type,full_picture,reactions.summary(true).limit(0)&limit='+fb_post.fb_limit+'&access_token='+fb_post.access_token;  

      console.log(url);
      var getPost = function() {

          var defer = $q.defer();

            $http.get(url)
              .then(function(response) {
                console.log(response);
                  if (response) {
                    defer.resolve(response.data);
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  defer.reject('error occured getting the facebook post');
              })
              return defer.promise;
      }

      getPost().then(function(data){


        var with_picture = [];

        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].hasOwnProperty('full_picture')) {
            with_picture.push(data.data[i]);
          }
        }

        var photo_arr = [];
        var video_arr = [];


        for (var i = 0; i < with_picture.length; i++) {
          if (with_picture[i].type == 'photo' || with_picture[i].type == 'link') {
            photo_arr.push(with_picture[i]);
          }else if (with_picture[i].type == 'video') {
            video_arr.push(with_picture[i]);
          }
        }

        $scope.facebook_post = photo_arr; // this includes images and link
        //$scope.facebook_post = data.data; //all campaign inluding video and link
      })


    $scope.numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $scope.boostPost = function(id) {
      console.log(id);
    }

}]);
