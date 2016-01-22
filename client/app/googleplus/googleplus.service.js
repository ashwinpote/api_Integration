'use strict';

angular.module('apiIntegrationApp')
    .service('googleplus', function($q, $interval) {
            var deferred = $q.defer();
            var auth_user = false;
            var obj = {}
            obj.collSearch = [];
            var clientId = '872153603162-mveialviigr5grm7tr0gfukvog9ge7g4.apps.googleusercontent.com',
                apiKey = 'AIzaSyBbZ7BbFJskR4L7HwZzLanwKvc-nyGqdow',
                scopes = 'https://www.googleapis.com/auth/plus.me';

            obj.init = function() {
                if (!auth_user) {
                    gapi.auth.authorize({
                        client_id: clientId,
                        scope: scopes,
                        immediate: false
                    }, obj.handleAuthResult);
                }
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
                            auth_user = true;
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
                    'params': {
                        'query': "" + search + "",
                        'orderBy': 'best',
                        'sortBy': 'recent',
                        'maxResults': '5'
                    }
                });
                request.then(function(resp) {
                    if (resp.result.items.length > 0) {
                        console.log("normal search");
                        obj.collSearch.push(search);
                        deferred.resolve(resp.result);
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            
            return deferred.promise;
        };

        obj.callapi = function() {
            console.log("interval function call")
            console.log(obj.collSearch)
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
                        console.log("interval search");
                        obj.collSearch.push(search);
                        deferred.resolve(resp.result);
                        console.log("interval")
                        console.log(resp.result)
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            });
            return deferred.promise;
        }

        // $interval(function() {
        //     obj.callapi();
        // }, 20000);
        return obj;
    });
