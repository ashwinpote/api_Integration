'use strict';

angular.module('apiIntegrationApp')
    .service('googleplus', function($q) {
    	var deferred = $q.defer();
        var obj = {}
        var clientId = '266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com',
            apiKey = 'AIzaSyAnMX4jucCO6omqJLTUZ4lkqZtDUY_cX2o',
            scopes = 'https://www.googleapis.com/auth/plus.me';

        obj.init = function() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, obj.handleAuthResult);
            return deferred.promise;
        }

        obj.handleClientLoad = function() {
            gapi.client.setApiKey(apiKey);
            gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        obj.checkAuth = function() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true,
                hd: domain
            }, obj.handleAuthResult);
        };

        obj.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                var data = {};
                gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function(resp) {
                        //console.log(resp)
                    });
                    deferred.resolve(data);
                });
               
            } else {
                deferred.reject('error');
            }
        };

        obj.handleAuthClick = function(event) {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false,
                hd: domain
            }, this.handleAuthResult);
            return false;
        };

        obj.search = function(q) {
        	var deferred = $q.defer();
            var search = encodeURIComponent(q);
            var request = gapi.client.request({
                'path': '/plus/v1/activities',
  				'params': {'query': ""+search+"", 'orderBy': 'best','sortBy':'recent', 'maxResults':'20'}
            });
            request.then(function(resp) {
                deferred.resolve(resp.result);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
            return deferred.promise;
        };
        return obj;
    });
