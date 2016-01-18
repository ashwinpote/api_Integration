'use strict';

(function() {

    class MainController {

        constructor(twitter, $scope) {

            $scope.showInputControls = false;

            $scope.onChanged = function(param){
            //    alert("clk");
                console.log(param);
                $scope.showInputControls = true;
                twitter.init();
               // twitter.openpopup();


            }
            

          $scope.search = function() {

                twitter.search($scope.trends).then(function(data) {
                    console.log(data)
                    $scope.result = data;
                })

            }


        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);

})();
