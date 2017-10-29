let app = angular.module('AirNow-Alert', []);

app.controller('MainCtrl', [
  '$scope', 
  '$http',
  function($scope, $http){

    $scope.getAQI = function() {
      return $http.get('/aqi/' + $scope.zip).then(function(data) {
        if (!data.data[0]) {
          $scope.aqi = "No data found :(";
        }
        $scope.aqi = data.data[0].AQI;
        $scope.name = data.data[0].ParameterName;
      });
    };
    
}]);