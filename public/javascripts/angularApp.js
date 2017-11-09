let app = angular.module('AirNow-Alert', []);

app.controller('MainCtrl', [
  '$scope', 
  '$http',
  function($scope, $http){

    let classes = [
      "good",
      "moderate",
      "usg",
      "unhealthy",
      "very-unhealthy",
      "hazardous",
      "unavailable"
    ];

    $scope.getAQI = function() {
      return $http.get('/aqi/' + $scope.zip).then(function(data) {
        if (!data.data[0]) {
          $scope.error = "No data found :(";
        }
        $scope.aqi = data.data;
        for(var i = 0; i < (data.data).length; i++) {
          (data.data[i]).quality = classes[((data.data[i]).Category.Number) - 1];
        }
      });
    };
    
}]);