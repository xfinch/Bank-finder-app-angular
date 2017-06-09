var findMyBank = angular.module('findMyBankApp', ['ngRoute']);

findMyBank.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'LocationController'
  })
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactController'
  })
  .when('/contact-success', {
    templateUrl: 'views/contact-success.html',
    controller: 'ContactController'
  })
  .when('/directory', {
    templateUrl: 'views/directory.html',
    controller: 'LocationController'
  })
  .otherwise({
    redirectTo: '/home'
  })

}]);
findMyBank.directive('featuredBranch', function() {

  return {
    restrict: 'E',
    scope: {
      banks: '=',
      title: '='
    },
    templateUrl: 'views/random.html',
    controller: function($scope) {
      $scope.random = Math.floor(Math.random() * 4);
    }
  }
});
findMyBank.controller('LocationController', ['$scope', '$http', function($scope, $http){
    $scope.addBank = function(){
      $scope.banks.push({
        name: "$scope.newBank.name",
        address: "$scope.newBank.address",
        cityState: "$scope.newBank.cityState",
        zip: "$scope.newBank.zip",
        saturday: "$scope.newBank.saturday"
      });
      $scope.newBank.name ="";
      $scope.newBank.address ="";
      $scope.newBank.cityState ="";
      $scope.newBank.zip="";
      $scope.newBank.saturday ="";
    };

    $http.get('data/banks.json').then(function(response) {
        var myVar = 'data';
        $scope.banks = response[myVar];
    });


}]);
findMyBank.controller('ContactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };

}]);
