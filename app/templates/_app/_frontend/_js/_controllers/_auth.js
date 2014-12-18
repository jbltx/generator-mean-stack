'use strict';

angular.module('<%= appName %>')
 	.controller('SigninCtrl',function($scope,$modalInstance,$window,$http) {
 		$scope.user = {};
 		$scope.signInMessage = '';
 		$scope.signin = function () {
		    $http.post('/signin', $scope.user).success(function () {
		    	$window.location.href='/admin';
		    })
		    .error(function () {
		    	$scope.signInMessage = 'Wrong credentials, try again';
		    });
		};

		$scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		};
 	});

angular.module('<%= appName %>')
 	.controller('SignupCtrl',function($scope,$modalInstance,$http,$window) {
 		$scope.user = {};
 		$scope.signUpMessage = '';
 		$scope.signup = function () {
		    $http.post('/signup', $scope.user).success(function () {
		    	$window.location.href='/admin';
		    })
		    .error(function (data) {
		    	$scope.signUpMessage = data;
		    });
		};

		$scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		};
 	});


angular.module('<%= appName %>')
	.controller('ValidateCtrl', function ($scope, $http, $routeParams) {
		$scope.title = 'Validate Email Address';
		$scope.message = 'Please wait...';

		if ($routeParams.key) {
			$http.post('/validate', {key: $routeParams.key})
				.success(function () {
					$scope.message = 'Your account is actived. Please sign in now.';
				})
				.error(function (data, status) {
					if(status === 404) {
						$scope.message = 'You sent a bad link, please try again to sign up.';
					}
					if(status === 403) {
						$scope.message = 'This email address is already actived.';
					}
				});
		}
		if ($routeParams.email && $routeParams.key) {
			$http.post('/unvalidate', {email: $routeParams.email, key: $routeParams.key})
				.success(function () {
					$scope.message = 'Your email has been deleted from our database.<br>'+
									 'We hope you will come back soon :)';		
				})
				.error(function (data, status) {
					if (status === 403) {
						$scope.message = 'This email address has already been activated. '+
										 'You can\'t unvalidate it now.';
					}
					if(status === 404) {
						$scope.message = 'You sent a bad link, please try again.';
					}
				});
		}
	});