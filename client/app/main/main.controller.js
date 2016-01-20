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
                                $scope.mainresult = currArr;
                               
                            });
                        })
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            currArr.push(data);
                            $scope.mainresult = currArr;
                        });
                        break;
                }

            }
            $scope.removeField = function(param) {                
                $scope.mainresult.splice(param, 1);
                currArr = $scope.mainresult;                
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
