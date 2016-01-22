'use strict';

angular.module('apiIntegrationApp')
    .service('commonServicegoogleapi', function() {

    	var obj = {};
    	obj.init = function (param) {      
    		if(param == "google"){
    			obj.auth_user = false;
		        obj.collSearch = [];
		        obj.clientId = '872153603162-mveialviigr5grm7tr0gfukvog9ge7g4.apps.googleusercontent.com',
		        obj.apiKey = 'AIzaSyBbZ7BbFJskR4L7HwZzLanwKvc-nyGqdow',
		        obj.scopes = 'https://www.googleapis.com/auth/plus.me';
		        console.log(obj);
    		}else if(param == "youtube"){

    		}
    		
  	
            if (!obj.auth_user) {
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
                client_id: obj.clientId,
                scope: obj.scopes,
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
                        obj.auth_user = true;
                    });
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
    });
