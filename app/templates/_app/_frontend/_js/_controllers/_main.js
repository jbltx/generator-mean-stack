'use strict';

angular.module('<%= appName %>')
  .controller('MainCtrl', function ($rootScope, $scope, $modal) {
	$rootScope.pageTitle = 'Homepage';
	$scope.signinModal = function () {
		$modal
			.open({
				templateUrl:'signin.html',
				controller: 'SigninCtrl'
			});
	};
	$scope.signupModal = function () {
		$modal
			.open({
				templateUrl:'signup.html',
				controller: 'SignupCtrl'
			});
	};

  });