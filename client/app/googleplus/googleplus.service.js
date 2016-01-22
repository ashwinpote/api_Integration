'use strict';

angular.module('apiIntegrationApp')
    .service('googleplus', function($q, $interval) {
        var deferred = $q.defer();
       
        var obj = {}
        obj.auth_user = false;
        obj.collSearch = [];
        obj.clientId = '872153603162-mveialviigr5grm7tr0gfukvog9ge7g4.apps.googleusercontent.com',
        obj.apiKey = 'AIzaSyBbZ7BbFJskR4L7HwZzLanwKvc-nyGqdow',
        obj.scopes = 'https://www.googleapis.com/auth/plus.me';

        obj.init = function() {
            if (!obj.auth_user) {
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
                client_id: obj.clientId,
                scope: obj.scopes,
                immediate: false,
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
                        obj.auth_user = true;
                    });
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

        obj.search = function(q) {
            var deferred = $q.defer();
            var search = encodeURIComponent(q);

            var request = gapi.client.request({
                'path': '/plus/v1/activities',
                'params': {
                    'query': "" + search + "",
                    'orderBy': 'best',
                    'sortBy': 'recent',
                    'maxResults': '5'
                }
            });
            request.then(function(resp) {
                if (resp.result.items.length > 0) {
                    obj.collSearch.push(search);
                    deferred.resolve(resp.result);
                }
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
            return deferred.promise;
        };

        obj.callapiInterval = function() {
            console.log("interval function call")
            angular.forEach(obj.collSearch, function(value, key) {
                var request = gapi.client.request({
                    'path': '/plus/v1/activities',
                    'params': {
                        'query': "" + value + "",
                        'orderBy': 'best',
                        'sortBy': 'recent',
                        'maxResults': '5'
                    }
                });
                request.then(function(resp) {
                    if (resp.result.items.length > 0) {
                        deferred.resolve(resp.result);
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            });
            return deferred.promise;
        }
        // $interval(function() {
        //     obj.callapiInterval();
        // }, 30000);
        return obj;
    });
