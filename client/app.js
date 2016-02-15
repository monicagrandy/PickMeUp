var myApp = angular.module("PickMeUp", []);

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

      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.store.lat + "," + $scope.store.long + "&key=AIzaSyDb8DBHpaDOPFvfMPlpleo8PLWsdZj9RZo").then(function(resp){
        console.log(resp.data.results[0].formatted_address);
          $scope.store.address = resp.data.results[0].formatted_address
           },
        function(resp){
          console.log("cannot retrieve data")
        });

      if($scope.store.hour < 17){
        $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&keyword=coffee&key=AIzaSyBT-Y9eLIx5y50wVHiXSXel1PzgdOaOCE0").then(function(resp){
            console.log(resp.data.results)
            $scope.store.list = resp.data.results
          },
          function(resp){
            console.log("cannot retrieve data")
          });
      }
      if($scope.store.hour >= 17){ 
        $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&keyword=bar&key=AIzaSyBT-Y9eLIx5y50wVHiXSXel1PzgdOaOCE0").then(function(resp){
          //console.log(resp.data.results)
          $scope.store.list = resp.data.results
          },
          function(resp){
          console.log("cannot retrieve data")
        });
      }
    });
  }
  //get address as a string

}])

// api.openweathermap.org/data/2.5/weather?lat=' + $scope.store.lat + '&lon=' + $scope.store.long + '&appid=128c543da50fbcc0d216056029148b7e&units=imperial'

//test
// var coordinates = {};

// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function(position){
//       coordinates.lat = position.coords.latitude;
//       coordinates.long = position.coords.longitude;
//       console.log(coordinates);
//   });
//   }

// //send those coordinates to open weather api
//       $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.store.lat + "," + $scope.store.long + "&key=AIzaSyDb8DBHpaDOPFvfMPlpleo8PLWsdZj9RZo").then(function(resp){
//           console.log(resp.data.results[3].address_components[0].short_name);
//           $scope.store.zip = parseInt(resp.data.results[3].address_components[0].short_name)
//         },
//         function(resp){
//           console.log("cannot retrieve data")
//         });