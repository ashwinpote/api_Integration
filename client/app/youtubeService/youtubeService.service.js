'use strict';

angular.module('apiIntegrationApp')
 .service('youtubeService', function ($q) {
    var obj = {};

    obj.search = function (q) {
        var deferred = $q.defer();
        var search = encodeURIComponent(q);
        gapi.client.setApiKey('AIzaSyDSh74BCydxtxx6a5PowltvGrqzsqRHcws');
        gapi.client.load('youtube', 'v3', function() {
            
        var request = gapi.client.youtube.search.list({
                part: 'snippet',
                type:'video',
                q:""+search+"",
                maxResults: 8
            });
            request.execute(function(response) {
                deferred.resolve(response);
                console.log(response)
            });
        });
        return deferred.promise;
    };
    
    return obj;
});