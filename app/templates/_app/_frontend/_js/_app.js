'use strict';

var app = angular.module('<%= appName %>', ['ngRoute','ui.bootstrap']);


app.config([
    '$routeProvider', 
    '$locationProvider', 
    '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {


  $httpProvider.interceptors.push('ajaxInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/404', {
      templateUrl: '404.html',
      controller: '404Ctrl'
    })
	.when('/admin', {
		templateUrl: 'views/profile.html',
		controller: 'AdminCtrl'
	})
    .otherwise({
      redirectTo: '/404'
    });

	$locationProvider.html5Mode(true);

}]);