'use strict';

angular.module('<%= appName %>').factory('$csrf', function () {
    var cookies = document.cookie.split('; ');
    for (var i=0; i<cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if(cookie[0].indexOf('XSRF-TOKEN') > -1) {
        return cookie[1];
      }
    }
    return 'none';
});


angular.module('<%= appName %>').factory('$remember', function () {
    var cookies = document.cookie.split('; ');
    for (var i=0; i<cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if(cookie[0].indexOf('remember') > -1) {
        return cookie[1];
      }
    }
    return 'none';
});
/*
angular.module('<%= appName %>').factory('$checkRemember', function ($q, $timeout, $remember, $window, $http) {
  var deferred = $q.defer();
    if($remember !== 'none') {
      $http.post('/signin').success(function () {
        $timeout(function () { deferred.reject(); }, 0);
        $window.location.href='/admin';
      })
      .error(function (err) {
        console.log(err);
        $timeout(deferred.resolve, 0 );
      });
    } 
    else {
      $timeout(deferred.resolve, 0 );
    }
    return deferred.promise;
});

angular.module('<%= appName %>').factory('$checkLoggedIn', function ($q, $timeout, $http, $location, $rootScope) {
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
});
*/