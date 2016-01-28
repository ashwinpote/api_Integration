'use strict';

angular.module('apiIntegrationApp')
    .service('commonService', function($q) {
        var deferred = $q.defer();
        var obj = {};
        obj.authUser = false;
        obj.clientId = '266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com';
        obj.apiKey = 'AIzaSyAnMX4jucCO6omqJLTUZ4lkqZtDUY_cX2o';

        obj.init = function(param) {
            if (param == "Youtube") {
                obj.scopes = 'https://www.googleapis.com/auth/youtube';
            } else {
                obj.scopes = 'https://www.googleapis.com/auth/plus.me';
            }
            if (!obj.authUser) {
                gapi.auth.authorize({
                    client_id: obj.clientId,
                    scope: obj.scopes,
                    immediate: false
                }, obj.handleAuthResult);
            }
            return deferred.promise;
        }

        obj.handleClientLoad = function() {
            gapi.client.setApiKey(obj.apiKey);
            gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        obj.checkAuth = function() {
            gapi.auth.authorize({
                client_id: object.clientId,
                scope: object.scopes,
                immediate: false
            }, obj.handleAuthResult);
        };

        obj.handleAuthResult = function(authResult) {
            obj.authResult = authResult;
            if (obj.authResult && !obj.authResult.error) {
                var data = {};
                gapi.client.load('youtube', 'v3', function() {
                    obj.authUser = true;
                    deferred.resolve(data);
                });
                gapi.client.load('oauth2', 'v2', function() {
                    obj.authUser = true;
                    deferred.resolve(data);
                });
            } else {
                deferred.reject('error');
            }
        };

        obj.handleAuthClick = function(event) {
            gapi.auth.authorize({
                client_id: obj.clientId,
                scope: obj.scopes,
                immediate: false
            }, obj.handleAuthResult);
            return false;
        };
        return obj;
    });
