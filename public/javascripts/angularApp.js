let app = angular.module('AirNow-Alert', []);

app.controller('MainCtrl', [
  '$scope', 
  '$http',
  function($scope, $http){

    $scope.getAQI = function() {
      $scope.AQI = -1;
      return $http({
        method: 'GET',
        url: '/aqi/' + $scope.zip
      }).success(function(data) {
        if(data == 404) {
          return alert("No Results :(");
        }
        console.log(data);
      });
    };
    
}]);