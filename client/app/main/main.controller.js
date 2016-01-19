'use strict';

(function() {
    class MainController {
        constructor(googleplus, $scope, $window) {

            googleplus.init();

            $scope.onChanged = function(param) {
                $scope.showInputControls = true;
            }

            $scope.showInputControls = false;

            $scope.search = function() {
                googleplus.search($scope.trends).then(function(data) {
                    $scope.result = data.items;
                    console.log(data);
                })
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);

})();
