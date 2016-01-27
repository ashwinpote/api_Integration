'use strict';

angular.module('apiIntegrationApp')
    .service('googleplus', function($q) {
        var deferred = $q.defer();

        var obj = {}
        obj.authUser = false;
        obj.authResult = {};
        obj.gapi = {};
        obj.collSearch = [];
        obj.clientId = '266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com';
        obj.apiKey = 'AIzaSyAnMX4jucCO6omqJLTUZ4lkqZtDUY_cX2o';
        obj.scopes = 'https://www.googleapis.com/auth/plus.me';

        obj.init = function(param) {
            if (!obj.auth_user) {
                obj.gapi = gapi;
                obj.gapi.auth.authorize({
                    client_id: obj.clientId,
                    scope: obj.scopes,
                    immediate: false
                }, obj.handleAuthResult);
            } else {
                obj.handleAuthResult(obj.authResult);
            }
            return deferred.promise;
        }

        obj.handleClientLoad = function() {
            obj.gapi.client.setApiKey(obj.apiKey);
            obj.gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        obj.checkAuth = function() {
            obj.gapi.auth.authorize({
                client_id: object.clientId,
                scope: object.scopes,
                immediate: false
            }, obj.handleAuthResult);
        };

        obj.handleAuthResult = function(authResult) {
            obj.authResult = authResult;
            if (obj.authResult && !obj.authResult.error) {
                var data = {};
                obj.gapi.client.load('youtube', 'v3', function() {
                    obj.auth_user = true;
                    deferred.resolve(data);
                });
            } else {
                deferred.reject('error');
            }
        };

        obj.handleAuthClick = function(event) {
            obj.gapi.auth.authorize({
                client_id: obj.clientId,
                scope: obj.scopes,
                immediate: false
            }, obj.handleAuthResult);
            return false;
        };


        obj.search = function(q) {

            var deferred = $q.defer();
            var search = encodeURIComponent(q);
            if (!obj.authUser) {
                obj.init().then(function(data) {
                    var request = obj.gapi.client.request({
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
                            deferred.resolve(resp.result);
                            obj.authUser = true;
                        }
                    }, function(reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });
                });
            } else {
                var request = obj.gapi.client.request({
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
                        deferred.resolve(resp.result);
                        obj.authUser = true;
                        obj.collSearch.push(search);
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            }
            return deferred.promise;
        };

        obj.callapiInterval = function() {
                console.log("interval function call")
                angular.forEach(obj.collSearch, function(value, key) {
                    var request = obj.gapi.client.request({
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
