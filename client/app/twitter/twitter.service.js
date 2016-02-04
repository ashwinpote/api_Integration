'use strict';

angular.module('apiIntegrationApp')
    .service('twitter', function($q) {
        var obj = {};
        obj.collSearch = [];

        obj.search = function(q) {
            OAuth.initialize('oEcDIQahkO4TUAND-yTs-H6oY_M')
            var deferred = $q.defer();
            if (!obj.twitter) {
                OAuth.popup('twitter', function(err, twitter) {
                    obj.twitter = twitter;
                    var search = encodeURIComponent(q)
                    twitter.get('/1.1/search/tweets.json?q=' + search + '&count=5').done(function(data) {
                        var returnData = data.statuses.map(function(d) {
                            return {
                                desp: d.text
                            }
                        })
                        obj.collSearch.push(search);
                        deferred.resolve(returnData);
                    })
                })
            } else {
                var search = encodeURIComponent(q)
                obj.twitter.get('/1.1/search/tweets.json?q=' + search + '&count=5').done(function(data) {
                    var returnData = data.statuses.map(function(d) {
                        return {
                            desp: d.text
                        }
                    })
                    obj.collSearch.push(search);
                    deferred.resolve(returnData);
                })
            }
            return deferred.promise;
        }
        obj.callapiInterval = function(search) {
            var deferred = $q.defer();
            obj.twitter.get('/1.1/search/tweets.json?q=' + search + '&count=5').done(function(data) {
                var returnData = data.statuses.map(function(d) {
                    return {
                        desp: d.text
                    }
                })
                deferred.resolve(returnData);
            })
            return deferred.promise;
        }
        return obj
    });
