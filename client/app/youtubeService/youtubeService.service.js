'use strict';

angular.module('apiIntegrationApp')
    .service('youtubeService', function($q, commonService) {
        var obj = {};
        obj.collSearch = [];

        obj.search = function(q) {
            var deferred = $q.defer();
            var search = encodeURIComponent(q);
            if (!commonService.authUser) {
                var res = obj.checkResult(search, false);
                deferred.resolve(res);
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
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                type: 'video',
                q: "" + search + "",
                maxResults: 8
            });
            request.execute(function(response) {
                deferred.resolve(response);
                if (!allowPush) {
                    obj.collSearch.push(search);
                }
            });
            return deferred.promise;
        }
        return obj;
    });
