let app = angular.module('AirNow-Alert', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    //Home state
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  //if no known state go home
  $urlRouterProvider.otherwise('home');
}]);

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
        let timeOfDay = "AM";
        let time = $scope.aqi[0].HourObserved;
        if($scope.aqi[0].HourObserved >= 12) {
          time = time - 12;
          timeOfDay = "PM";
        }
        if(time == 0) {
          time = 12;
        }
        $scope.aqi[0].time = time + timeOfDay;
      });
    };
    
}]);