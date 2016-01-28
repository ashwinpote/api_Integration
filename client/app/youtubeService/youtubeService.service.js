'use strict';

angular.module('apiIntegrationApp')
    .service('youtubeService', function($q, commonService) {
        var deferred = $q.defer();
        var object = {};
        object.collSearch = [];

        object.search = function(q) {
            var deferred = $q.defer();
            var search = encodeURIComponent(q);
            if (!commonService.authUser) {
                commonService.init("Youtube").then(function(data) {
                    var request = gapi.client.youtube.search.list({
                        part: 'snippet',
                        type: 'video',
                        q: "" + search + "",
                        maxResults: 8
                    });
                    request.execute(function(response) {
                        deferred.resolve(response);
                        object.collSearch.push(search);
                    });
                });
            } else {
                var request = gapi.client.youtube.search.list({
                    part: 'snippet',
                    type: 'video',
                    q: "" + search + "",
                    maxResults: 8
                });
                request.execute(function(response) {
                    deferred.resolve(response);
                    object.collSearch.push(search);
                });
            }
            return deferred.promise;
        };
        return object;
    });
