'use strict';

angular.module('<%= appName %>')
	.controller('AdminCtrl', function($rootScope, $scope, $http, $window) {

		$rootScope.pageTitle = 'Admin | ' + $rootScope.currentUser.fullname;
		$scope.errorMessage = '';
		$scope.tasks = [];

		var read = function () {
			$http.get('/task').success(function (tasks) {
				if (tasks === '0') {
					$scope.tasks= [];
					$scope.errorMessage ='There\'s no tasks in the database. Create one if you want !';
				} else {
					$scope.tasks = tasks;
					$scope.errorMessage ='';
				}
			}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
			});
		};

		$scope.create = function () {
			var prompt = $window.prompt('Create a new task :', 'Task Name');
			if (prompt !== null ) {
				$http.post('/task', {name: prompt}).success(function () {
					read();
				}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
				});
			}
		};
			
		$scope.edit = function (taskId, taskName) {
			var prompt = $window.prompt('New task name :', taskName);
			if(prompt !== null) {
				$http.put('/task/'+taskId, {name: prompt}).success(function () {
					read();
				}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
				});
			}
		};

		$scope.delete = function (taskId) {
			$http.delete('/task/'+taskId).success(function () {
				read();
			}).error(function (error, status) {
				$scope.errorMessage = error + ' (code:' + status + ')';
			});
		};

		read();

	});