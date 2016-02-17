var myApp = angular.module("PickMeUp", ['ngMap']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){

$scope.store = {};
$scope.store.lat = 0;
$scope.store.long = 0;
$scope.store.hour = new Date().getHours();

//get coordinates of current location

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.store.lat = position.coords.latitude;
      $scope.store.long = position.coords.longitude;
      console.log($scope.store.lat)
      console.log($scope.store.long)
      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.store.lat + "," + $scope.store.long + "&key=AIzaSyDb8DBHpaDOPFvfMPlpleo8PLWsdZj9RZo").then(function(resp){
        console.log(resp.data.results[0].formatted_address);
          $scope.store.address = resp.data.results[0].formatted_address
           },
        function(resp){
          console.log("cannot retrieve data")
        });
      if($scope.store.hour < 17){
        $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&keyword=coffee&key=AIzaSyC5OMnpklycsXCq4WzoasPJ11lQ4279ZIg").then(function(resp){
            console.log(resp.data.results)
            $scope.store.list = resp.data.results
          },
          function(resp){
            console.log("cannot retrieve data")
          });
      }
      else if($scope.store.hour >= 17){ 
        $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&type=bar&key=AIzaSyC5OMnpklycsXCq4WzoasPJ11lQ4279ZIg").then(function(resp){
          //console.log(resp.data.results)
          $scope.store.list = resp.data.results
          },
          function(resp){
          console.log("cannot retrieve data")
        });
      }
    });
  }

}])

