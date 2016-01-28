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
                        var searchText = angular.lowercase($scope.trends);
                        if (googleplus.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in result list!');
                        } else {
                            googleplus.search(searchText).then(function(data) {
                                currArr.push(data.items);
                                $scope.mainresult = currArr;
                            });
                        }
                        break;
                    case "Twitter":
                        var searchText = angular.lowercase($scope.trends);
                        if (twitter.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in result list!');
                        } else {
                            twitter.search($scope.trends).then(function(data) {
                                currArr.push(data.statuses);
                                console.log(data.statuses)
                                $scope.mainresult = currArr;
                            });
                        }
                        break;
                    case "Youtube":
                        var searchText = angular.lowercase($scope.trends);
                        if (youtubeService.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in result list!');
                        } else {
                            youtubeService.search($scope.trends).then(function(data) {
                                currArr.push(data.items);
                                $scope.mainresult = currArr;
                            });
                        }
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
                twitter.collSearch.splice(param, 1);
                youtubeService.collSearch.splice(param, 1);
                currArr = $scope.mainresult;
                console.log(googleplus.collSearch)
                console.log(twitter.collSearch)
                console.log(youtubeService.collSearch)
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
