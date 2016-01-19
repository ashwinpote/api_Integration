'use strict';

angular.module('apiIntegrationApp')
    .filter('emptycheckTitle', function() {
        return function(array) {
            var filteredArray = [];
            angular.forEach(array, function(item) {
                if (item.title) filteredArray.push(item);
            });
            return filteredArray;
        };
    });
