'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, youtubeService, $scope, $location, $window, $interval) {

            var currSelect = "";
            var currArr = [];
            var obj = {};
            obj.check_twitter = false;
            obj.check_googleplus = false;
            obj.check_youtube = false;
            $scope.showInputControls = true;

            $interval(function() {
                currArr = [];
                $scope.mainresult = null;
                if (obj.check_twitter) {
                    angular.forEach(twitter.collSearch, function(value, key) {
                        twitter.callapiInterval(value).then(function(data) {
                            currArr.push(data);
                            $scope.mainresult = currArr;
                        });
                    });
                    console.log("in twitter interval")
                }
                if (obj.check_googleplus) {
                    angular.forEach(googleplus.collSearch, function(value, key) {
                        googleplus.callapiInterval(value).then(function(data) {
                            currArr.push(data.items);
                            $scope.mainresult = currArr;
                        });
                    });
                    console.log("in googleplus interval")
                }
                if (obj.check_youtube) {
                    angular.forEach(youtubeService.collSearch, function(value, key) {
                        youtubeService.callapiInterval(value).then(function(data) {
                            currArr.push(data.items);
                            $scope.mainresult = currArr;
                        });
                    });
                    console.log("in Youtube interval")
                }
            }, 20000);

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
            }

            $scope.search = function() {
                switch (currSelect) {
                    case "Google+":
                        var searchText = angular.lowercase($scope.trends);
                        if (googleplus.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in Google+ search list!');
                        } else {
                            googleplus.search(searchText).then(function(data) {
                                currArr.push(data.items);
                                $scope.mainresult = currArr;
                                $scope.currValue = "Google+";
                                obj.check_googleplus = true;
                            });
                        }
                        break;
                    case "Twitter":
                        var searchText = angular.lowercase($scope.trends);
                        if (twitter.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in twitter search list!');
                        } else {
                            twitter.search(searchText).then(function(data) {
                                currArr.push(data);
                                $scope.mainresult = currArr;
                                $scope.currValue = "Twitter";
                                obj.check_twitter = true;
                            });
                        }
                        break;
                    case "Youtube":
                        var searchText = angular.lowercase($scope.trends);
                        if (youtubeService.collSearch.indexOf(searchText) !== -1) {
                            alert(searchText + ' already exists in Youtube search list!');
                        } else {
                            youtubeService.search(searchText).then(function(data) {
                                currArr.push(data.items);
                                $scope.mainresult = currArr;
                                $scope.currValue = "Youtube";
                                obj.check_youtube = true;
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
            $scope.removeField = function(param, event) {
                $scope.mainresult.splice(param, 1);
                switch (event.target.dataset.selapi) {
                    case 'Google+':
                        googleplus.collSearch.splice(param, 1);
                        if(googleplus.collSearch.length == 0){
                            obj.check_googleplus = false;
                        }
                        break;
                    case 'Twitter':
                        twitter.collSearch.splice(param, 1);
                        if(twitter.collSearch.length == 0){
                            obj.check_twitter = false;
                        }
                        break;
                    case 'Youtube':
                        youtubeService.collSearch.splice(param, 1);
                        if(youtubeService.collSearch.length == 0){
                            obj.check_youtube = false;
                        }
                        break;
                }
                currArr = $scope.mainresult;
            }
        }
    }

    angular.module('apiIntegrationApp')
        .controller('MainController', MainController);
})();
