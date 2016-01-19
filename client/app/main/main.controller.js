'use strict';

(function() {
    class MainController {
        constructor(googleplus, twitter, $scope, $window) {
            var currSelect = "";
            $scope.showInputControls = false;            

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
                $scope.result = "";
                
                switch (currSelect) {
                    case "Google+":
                        googleplus.init().then(function() {
                            $scope.showInputControls = true;
                        });
                        break;
                    case "Twitter":
                        twitter.init();
                        $scope.showInputControls = true;                        
                        break;
                }
            }

            $scope.search = function() {
                switch (currSelect) {
                    case "Google+":
                        googleplus.search($scope.trends).then(function(data) {
                            $scope.result = data.items;
                        });
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            $scope.result = data;
                        });
                        break;
                }
            }
            $scope.removeField = function(param){

                $scope.result.splice(param,1);  
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);

})();
