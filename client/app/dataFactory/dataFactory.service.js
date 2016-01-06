'use strict';

angular.module('apiIntegrationApp').factory('dataFactory', function ($q, $window) { 
  
	var signIn;
    signIn = function () {
        var defered = $q.defer();
        $window.signinCallback = function (response) {
            $window.signinCallback = undefined;
            defered.resolve(response);
        };

        gapi.auth.signIn({
            clientid: "266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com"
            cookiepolicy: "single_host_origin"
            requestvisibleactions: "http://schemas.google.com/AddActivity"
            scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
            callback: "signinCallback"

        }) 
        return defered.promise;
    };
     return {
        signIn: signIn;
    }
      
  });
