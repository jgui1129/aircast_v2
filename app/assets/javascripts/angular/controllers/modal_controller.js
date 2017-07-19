angular.module('Aircast.controllers')
  .controller('ModalController',
  ['$scope', '$state', 'NgMap',
    function($scope, $state, NgMap) {
    // NgMap.getMap().then(function(map) {
    //   console.log(map.getCenter());
    //   console.log('markers', map.markers);
    //   console.log('shapes', map.shapes);
    // });
    //
    // console.log($scope)


    $scope.all_enabled_areas = {
      selected:{}
    };

    $scope.final_locations = {}
    clicked_loc = $scope.clicked_location

    _.each($scope.clicked_location.areas, function(x) {
      $scope.all_enabled_areas.selected[x.rpi_id] = true
    })

    $scope.active = function() {
      selected_areas = []
      
      _.each(_.keys($scope.all_enabled_areas.selected), function(c) {
        if($scope.all_enabled_areas.selected[c] === true) {
          area = _.filter(clicked_loc.areas, function(num){ return num.rpi_id == c; });
          selected_areas.push(area)
        }
      })
      selected_areas = _.flatten(selected_areas)
      $scope.final_locations = $scope.clicked_location
      $scope.final_locations["selected_areas"] = selected_areas

      // $scope.final_locations = clicked_loc
      // console.log($scope.clicked_location.areas)
      // $scope.final_locations.areas = selected_areas
    }



}]);
