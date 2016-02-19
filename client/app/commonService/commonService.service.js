'use strict';

app.service('commonService', function($q, config) {
    var deferred = $q.defer();
    var obj = {};
    obj.authUser = false;
    obj.clientId = config.googleClientId;
    obj.apiKey = config.googleApiKey;

    obj.init = function(param) {
        obj.scopes = (param == "Youtube") ? config.googlePlusScope : config.googleYoutubeScope;
        if (!obj.authUser) {
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
            client_id: object.clientId,
            scope: object.scopes,
            immediate: false
        }, obj.handleAuthResult);
    };

    obj.handleAuthResult = function(authResult) {
        obj.authResult = authResult;
        if (obj.authResult && !obj.authResult.error) {
            var data = {};
            gapi.client.load('youtube', 'v3', function() {
                obj.authUser = true;
                deferred.resolve(data);
            });
            gapi.client.load('oauth2', 'v2', function() {
                obj.authUser = true;
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

    obj.onDropComplete = function(data, index, obj) {
        var otherObj = data[index];
        var otherIndex = data.indexOf(obj);
        data[index] = obj;
        data[otherIndex] = otherObj;
    };

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
    return obj;
});
