'use strict';

(function() {

    class MainController {

        constructor(twitter,$scope) {

        	
            twitter.init();

            $scope.search = function() {

            	twitter.search($scope.trends).then(function(data){
            		console.log(data)
            		$scope.result=data;
            	})

            }


        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);

})();
