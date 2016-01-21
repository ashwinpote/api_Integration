'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, $scope, $window) {
            var currSelect = "";
            var collObj = {};
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
                                collObj = data.items;
                                $scope.mainresult = collObj;
                            });
                        })
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            collObj = data;
                            $scope.mainresult = collObj;
                        });
                        break;
                }

            }
            $scope.removeField = function(param) {
                $scope.mainresult.splice(param, 1);
                collObj = $scope.mainresult;
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
