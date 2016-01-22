'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, youtubeService, $scope, $location, $window) {
            
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
                            var searchText = angular.lowercase($scope.trends);
                            if (googleplus.collSearch.indexOf(searchText) !== -1) {
                                alert(searchText+ ' already exists in result list!');
                            } else {
                                googleplus.search(searchText).then(function(data) {
                                    currArr.push(data.items);
                                    $scope.mainresult = currArr;
                                });
                            }
                        });
                        break;
                    case "Twitter":
                        twitter.search($scope.trends).then(function(data) {
                            currArr.push(data);
                            $scope.mainresult = currArr;
                        });
                        break;
                }
            }
            $scope.onDropComplete = function(index, obj, evt) {
                var otherObj = $scope.mainresult[index];
                var otherIndex = $scope.mainresult.indexOf(obj);
                $scope.mainresult[index] = obj;
                $scope.mainresult[otherIndex] = otherObj;
            }
            $scope.removeField = function(param) {
                $scope.mainresult.splice(param, 1);
                googleplus.collSearch.splice(param, 1);
                currArr = $scope.mainresult;
                console.log(currArr);
                console.log(googleplus.collSearch);
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
