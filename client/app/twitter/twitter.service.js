'use strict';

app.service('twitter', function($q, config) {
    var obj = {};
    obj.collSearch = [];

    obj.twitterGet = function(search, allowPush) {
        var deferred = $q.defer();
        obj.twitter.get('/1.1/search/tweets.json?q=' + search + '&count=5').done(function(data) {
            var returnData = data.statuses.map(function(d) {
                return {
                    desp: d.text
                }
            })
            if (!allowPush) {
                obj.collSearch.push(search);
            }
            deferred.resolve(returnData);
        })
        return deferred.promise;
    }

    obj.search = function(q) {
        OAuth.initialize(config.twitterApiKey);
        var search = encodeURIComponent(q);
        var deferred = $q.defer();
        if (!obj.twitter) {
            OAuth.popup('twitter', function(err, twitter) {
                obj.twitter = twitter;
                var res = obj.twitterGet(search, false);
                deferred.resolve(res);
            })
        } else {
            var res = obj.twitterGet(search, false);
            deferred.resolve(res);
        }
        return deferred.promise;
    }
    obj.callapiInterval = function(search) {
        var deferred = $q.defer();
        var res = obj.twitterGet(search, false);
        deferred.resolve(res);
        return deferred.promise;
    }
    return obj;
});
