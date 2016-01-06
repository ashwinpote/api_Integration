'use strict';

app.controller('myController', function ($scope, dataFactory) {
    $scope.signIn = function() {
      console.log("signIn");
        dataFactory.signIn().then(function(response) {

        });    
    }
});
