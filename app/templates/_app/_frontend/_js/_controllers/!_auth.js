'use strict';

angular.module('<%= appName %>')
	.controller('HeaderCtrl', function ($scope, $modal, $http, $window, $cookieStore) {	


		var isRemembered = function ($q, $cookies, $http, $timeout, $location, $cookieStore) {
            var deferred = $q.defer();
            if($cookies.remember) {
                $http.post('/signin').success(function () {
                    $timeout(function() { deferred.reject();}, 0);
                    $location.url('/admin');
                }).error(function (err, status) {
                    if(err && status === 401) {
                        $cookieStore.remove('remember');
                    }
                    $timeout(deferred.resolve, 0);
                });
            }
            else {
                $timeout(deferred.resolve, 0);
            }
            return deferred.promise;
        };


		$scope.signinModal = function () {
			$modal
				.open({
					templateUrl:'signin.html',
					controller: 'SigninCtrl',
					size: 'sm',
					resolve: {remembered: isRemembered}
				});
		};
		$scope.signupModal = function () {
			$modal
				.open({
					templateUrl:'signup.html',
					controller: 'SignupCtrl',
					size: 'sm'
				});
		};

		$scope.signout = function () {
			$http
				.post('/signout')
				.success(function () {
					$cookieStore.remove('remember');
					$window.location.href='/';
				});

		};

	});

angular.module('<%= appName %>')
 	.controller('SigninCtrl',function ($scope,$modalInstance,$window,$http) {
 		$scope.user = {};
 		$scope.signInMessage = '';
 		$scope.signin = function () {
		    $http.post('/signin', $scope.user).success(function () {
		    	$window.location.href='/admin';
		    })
		    .error(function (data,tentatives) {
		    	$scope.signInMessage = 'Wrong credentials, try again ( '+tentatives+' tentative(s) )';
		    });
		};

		$scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		};
		
 	});

angular.module('<%= appName %>')
 	.controller('SignupCtrl',function ($scope,$modalInstance,$http,$window) {
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

<% if(filters.mail) { %>
angular.module('<%= appName %>')
	.controller('ValidateCtrl', function ($scope, $http, $routeParams, $location) {
		$scope.title = 'Validate Email Address';
		$scope.message = 'Please wait...';

		
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
		else {
			$location.url('/');
		}
	});

<% } %>