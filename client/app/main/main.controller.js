'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, youtubeService, $scope, $window) {
            var currSelect = "";
            $scope.showInputControls = true;

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
                $scope.result = "";
            }

            $scope.search = function() {
                switch (currSelect) {
                    case "Google+":
                    googleplus.init().then(function() {
                             googleplus.search($scope.trends).then(function(data) {
                            $scope.result = data.items;
                        });
                        });
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            $scope.result = data;
                        });
                        break;
                    case "Youtube":
                        youtubeService.search($scope.trends).then(function(data) {
                            $scope.result = data.items;
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
