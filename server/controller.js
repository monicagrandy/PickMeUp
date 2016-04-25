var PlaceSearch = require('google-locations');
var Geocode = require('geocoder')
var config = require('./config.js')

exports.getAddress = function(req, res){
	console.log(req.body);
	var lat = req.body.lat;
  var lng = req.body.lng;
  Geocode.reverseGeocode(lat, lng, function(err, data){
  	if(err){
  		console.log(err);
  	}
  	else {
  		console.log("here is the data from getAddress: ", data);
  	}
  })
}

exports.getPlaces = function(req, res){
	console.log(req.body);
	var lat = req.body.lat;
  var lng = req.body.lng;
  var time = req.body.time;
  var locations = new PlaceSearch(config.placesKey);
  if(time < 17){
		locations.search({
		  keyword: 'coffee',
		  location: [lat, lng],
		  radius: 1609.34
		}, function(err, response) {
		  if (err) {
		    throw err;
		  }
		  console.log("here is the data from getAddress: ", response)
	}
	else {
		locations.search({
		  keyword: 'bar',
		  location: [lat, lng],
		  radius: 1609.34
		}, function(err, response) {
		  if (err) {
		    throw err;
		  }
		  console.log("here is the data from getAddress: ", response)
	}
	}	  
}





// $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.store.lat + "," + $scope.store.long + "&key=AIzaSyDb8DBHpaDOPFvfMPlpleo8PLWsdZj9RZo").then(function(resp){
//         console.log(resp.data.results[0].formatted_address);
//           $scope.store.address = resp.data.results[0].formatted_address
//            },
//         function(resp){
//           console.log("cannot retrieve data")
//         });
//       if($scope.store.hour < 17){
//         $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&keyword=coffee&key=AIzaSyBT-Y9eLIx5y50wVHiXSXel1PzgdOaOCE0").then(function(resp){
//             console.log(resp.data.results)
//             $scope.store.list = resp.data.results
//           },
//           function(resp){
//             console.log("cannot retrieve data")
//           });
//       }
//       else if($scope.store.hour >= 17){ 
//         $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $scope.store.lat + "," + $scope.store.long + "&radius=1609.34&type=bar&key=AIzaSyBT-Y9eLIx5y50wVHiXSXel1PzgdOaOCE0").then(function(resp){
//           //console.log(resp.data.results)
//           $scope.store.list = resp.data.results
//           },
//           function(resp){
//           console.log("cannot retrieve data")
//         });
//       }
//     });
//   }