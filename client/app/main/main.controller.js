'use strict';


app.controller('myController', ['$scope', 'GooglePlus', function ($scope, GooglePlus) {
	$scope.login = function () {
          GooglePlus.login().then(function (authResult) {
              console.log(authResult);
  
              GooglePlus.getUser().then(function (user) {
                  console.log(user);
              });
          }, function (err) {
              console.log(err);
          });
        };
});
