'use strict';

var app = angular.module('<%= appName %>', ['ngRoute','ui.bootstrap']);


app.config([
    '$routeProvider', 
    '$locationProvider', 
    '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {


  var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/signedin').success(function(user) {
      if (user !== '0'){
        $rootScope.isSignedIn = true;
        $rootScope.currentUser = user;
        $timeout(deferred.resolve, 0);
      }
      else {
        $rootScope.isSignedIn = false;
        $rootScope.message = 'Need to sign in.';
        $timeout(function() { deferred.reject();}, 0);
        $location.url('/');
      }   
    });
    return deferred.promise;
  };



  $httpProvider.interceptors.push('ajaxInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/404', {
      templateUrl: 'views/404.html',
      controller: '404Ctrl'
    })
  .when('/admin', {
    templateUrl: 'views/profile.html',
    controller: 'AdminCtrl',
    resolve: {loggedin: checkLoggedIn}
  })
    .otherwise({
      redirectTo: '/404'
    });

  $locationProvider.html5Mode(true);

}]);