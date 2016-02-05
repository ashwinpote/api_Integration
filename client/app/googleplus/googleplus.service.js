'use strict';

app.service('googleplus', function($q, commonService) {
    var obj = {}
    obj.collSearch = [];

    obj.search = function(q) {
        var deferred = $q.defer();
        var search = encodeURIComponent(q);
        if (!commonService.authUser) {
            commonService.init("Google+").then(function(data) {
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
                        deferred.resolve(resp.result);
                        obj.collSearch.push(search);
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            });
        } else {
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
                    deferred.resolve(resp.result);
                    obj.collSearch.push(search);
                }
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }
        return deferred.promise;
    };

    obj.callapiInterval = function(search) {
        var deferred = $q.defer();
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
                deferred.resolve(resp.result);
            }
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
        return deferred.promise;
    }
    return obj;
});
