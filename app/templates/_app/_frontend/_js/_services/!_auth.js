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