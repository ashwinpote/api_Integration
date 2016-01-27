
'use strict';

angular.module('apiIntegrationApp')
    .filter('emptycheckTitle', function() {
        return function(array) {
            var filteredArray = [];
            angular.forEach(array, function(item) {
            	if (item.title){
                	filteredArray.push(item);
                }else if(item.text){
					filteredArray.push(item);
                }
                else if(item.entities.urls.url){
                    filteredArray.push(item);
                }
                else if(item.snippet){
                    if(item.snippet.description){
                        filteredArray.push(item);    
                    }
                    
                } 
            });
            return filteredArray;
        };
    });