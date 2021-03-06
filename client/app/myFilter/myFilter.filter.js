'use strict';

app.filter('emptycheckTitle', function() {
        return function(array) {
            var filteredArray = [];
            angular.forEach(array, function(item) {
                if (item.title) {
                    filteredArray.push(item);
                } else if (item.desp) {
                    filteredArray.push(item);
                } else if (item.text) {
                    filteredArray.push(item);
                } else if (item.snippet) {
                    if (item.snippet.description) {
                        filteredArray.push(item);
                    }
                }
            });
            return filteredArray;
        };
    });
