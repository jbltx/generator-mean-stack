'use strict';

angular.module('<%= appName %>')
	.controller('AdminController', function($rootScope, $scope) {
		$rootScope.pageTitle = 'Admin' + $rootScope.currentUser.username;
		$scope.greeting = 'Welcome '+$rootScope.currentUser.username+' to admin part.';
		$scope.adminTasks = {};
	});