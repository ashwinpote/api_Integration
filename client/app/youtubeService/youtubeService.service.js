'use strict';

angular.module('apiIntegrationApp')
    .service('youtubeService', function($q) {
        var deferred = $q.defer();

        var object = {};
        object.auth_user = false;
        object.gapi = {};
        object.authResult = {};
        object.collSearch = [];
        object.clientId = '503652870654-62ohhpkan60di1rmpd6nuh418j111393.apps.googleusercontent.com';
        object.apiKey = 'AIzaSyDSh74BCydxtxx6a5PowltvGrqzsqRHcws';
        object.scopes = 'https://www.googleapis.com/auth/youtube';


        object.init = function(param) {
            if (!object.auth_user) {
                object.gapi = gapi;
                object.gapi.auth.authorize({
                    client_id: object.clientId,
                    scope: object.scopes,
                    immediate: false
                }, object.handleAuthResult);
            } else {
                object.handleAuthResult(object.authResult);
            }
            return deferred.promise;
        }

        object.handleClientLoad = function() {
            object.gapi.client.setApiKey(object.apiKey);
            object.gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        object.checkAuth = function() {
            object.gapi.auth.authorize({
                client_id: object.clientId,
                scope: object.scopes,
                immediate: false
            }, object.handleAuthResult);
        };

        object.handleAuthResult = function(authResult) {
            object.authResult = authResult;
            if (object.authResult && !object.authResult.error) {
                var data = {};
                object.gapi.client.load('youtube', 'v3', function() {
                    object.auth_user = true;
                    deferred.resolve(data);
                });
            } else {
                deferred.reject('error');
            }
        };

        object.handleAuthClick = function(event) {
            object.gapi.auth.authorize({
                client_id: object.clientId,
                scope: object.scopes,
                immediate: false
            }, object.handleAuthResult);
            return false;
        };

        object.search = function(q) {
            var deferred = $q.defer();
            var search = encodeURIComponent(q);
            if (!object.authUser) {
                object.init().then(function(data) {
                    var request = object.gapi.client.youtube.search.list({
                        part: 'snippet',
                        type: 'video',
                        q: "" + search + "",
                        maxResults: 8
                    });
                    request.execute(function(response) {
                        deferred.resolve(response);
                        object.auth_user = true;
                        object.collSearch.push(search);
                    });
                });
            }else {
                var request = object.gapi.client.youtube.search.list({
                        part: 'snippet',
                        type: 'video',
                        q: "" + search + "",
                        maxResults: 8
                    });
                    request.execute(function(response) {
                        deferred.resolve(response);
                        object.auth_user = true;
                    });
            }

            return deferred.promise;
        };
        return object;
    });
