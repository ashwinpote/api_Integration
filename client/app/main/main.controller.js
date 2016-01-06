'use strict';

app.controller('myController', function ($scope, GPlusAuthService) {
    $scope.signIn = function() {
      console.log("signIn");
        GPlusAuthService.signIn().then(function(response) {

        });    
    }
});
