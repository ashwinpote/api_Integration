'use strict';

app.service('googleplus', function($q, commonService) {
    var obj = {}
    obj.collSearch = [];

    obj.search = function(q) {
        var deferred = $q.defer();
        var search = encodeURIComponent(q);
        if (!commonService.authUser) {
            commonService.init("Google+").then(function(data) {
                var res = obj.checkResult(search, false);
                deferred.resolve(res);
            });
        } else {
            var res = obj.checkResult(search, false);
            deferred.resolve(res);
        }
        return deferred.promise;
    };

    obj.callapiInterval = function(search) {
        var deferred = $q.defer();
        var res = obj.checkResult(search, true);
        deferred.resolve(res);
        return deferred.promise;
    }

    obj.checkResult = function(search, allowPush) {
        var deferred = $q.defer();
        var request = gapi.client.request({
            'path': '/plus/v1/activities',
            'params': {
                'query': "" + search + "",
                'orderBy': 'best',
                'sortBy': 'recent'
            }
        });
        request.then(function(resp) {
            if (resp.result.items.length > 0) {
                deferred.resolve(resp.result);
                if (!allowPush) {
                    obj.collSearch.push(search);
                }
            }
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
        return deferred.promise;
    }
    return obj;
});
