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
      var dataToSend = {
        lat: $scope.store.lat,
        lng: $scope.store.long,
        time: $scope.store.hour
      }
      console.log("this is the data: ", dataToSend)
      $scope.sendData(dataToSend, '/apiAddress');
      $scope.sendData(dataToSend, '/apiPlaces');
  });
}    

      
  //get address as a string
$scope.sendAddress = function(info, route){
  console.log("inside sendData!")
  $http({
        method: 'POST',
        url: route,
        data: info
      }).then(function success(response) {
          console.log(response)
        },
        function error(err) {
          console.log("ERROR: ", err);
        });
  }


}])

