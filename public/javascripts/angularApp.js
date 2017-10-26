let app = angular.module('AirNow-Alert', []);

app.controller('MainCtrl', [
  '$scope', 
  '$http',
  function($scope, $http){

    $scope.getAQI = function() {
      $scope.aqi = -1;
      return $http.get('/aqi/' + $scope.zip).then(function(data) {
        console.log(data.data);
      });
    };
    
}]);