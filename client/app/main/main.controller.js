'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, $scope, $window) {
            var currSelect = "";
            var currArr = [];
            $scope.showInputControls = true;

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
            }

            $scope.search = function() {
                switch (currSelect) {
                    case "Google+":
                        googleplus.init().then(function(data) {
                            googleplus.search($scope.trends).then(function(data) {
                                currArr.push(data.items);
                                $scope.result = data.items;
                                $scope.mainresult = currArr;
                                console.log($scope.result)
                                 console.log($scope.mainresult)
                            });
                        })
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            currArr.push(data);
                            $scope.result = currArr;
                            console.log(currArr);
                        });
                        break;
                }

            }
            $scope.removeField = function(param) {
                $scope.result.splice(param, 1);
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
