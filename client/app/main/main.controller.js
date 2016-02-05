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

            // $interval(function() {
            //     currArr = [];
            //     $scope.mainresult = null;
            //     if (obj.check_twitter) {
            //         twitter.collSearch.forEach(function(value) {
            //             twitter.callapiInterval(value).then(function(data) {
            //                 currArr.push(data);
            //                 $scope.mainresult = currArr;
            //             });
            //         });
            //     }
            //     if (obj.check_googleplus) {
            //         angular.forEach(googleplus.collSearch, function(value, key) {
            //             googleplus.callapiInterval(value).then(function(data) {
            //                 currArr.push(data.items);
            //                 $scope.mainresult = currArr;
            //             });
            //         });
            //     }
            //     if (obj.check_youtube) {
            //         angular.forEach(youtubeService.collSearch, function(value, key) {
            //             youtubeService.callapiInterval(value).then(function(data) {
            //                 currArr.push(data.items);
            //                 $scope.mainresult = currArr;
            //             });
            //         });
            //     }
            // }, 20000);

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
                $scope.errorMsg = "";
            }

            $scope.search = function() {
                var searchText = angular.lowercase($scope.trends);
                switch (currSelect) {
                    case "Google+":
                        if (googleplus.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in Google+ search list!';
                        } else {
                            $scope.errorMsg = "";
                            googleplus.search(searchText).then(function(data) {
                                currArr.push(data.items);
                                $scope.mainresult = currArr;
                                $scope.currValue = "Google+";
                                obj.check_googleplus = true;
                            });
                        }
                        break;
                    case "Twitter":
                        if (twitter.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in twitter search list!';
                        } else {
                            $scope.errorMsg = "";
                            twitter.search(searchText).then(function(data) {
                                currArr.push(data);
                                $scope.mainresult = currArr;
                                $scope.currValue = "Twitter";
                                obj.check_twitter = true;
                            });
                        }
                        break;
                    case "Youtube":
                        if (youtubeService.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in Youtube search list!';
                        } else {
                            $scope.errorMsg = "";
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
                        if (googleplus.collSearch.length == 0) {
                            obj.check_googleplus = false;
                        }
                        break;
                    case 'Twitter':
                        twitter.collSearch.splice(param, 1);
                        if (twitter.collSearch.length == 0) {
                            obj.check_twitter = false;
                        }
                        break;
                    case 'Youtube':
                        youtubeService.collSearch.splice(param, 1);
                        if (youtubeService.collSearch.length == 0) {
                            obj.check_youtube = false;
                        }
                        break;
                }
                currArr = $scope.mainresult;
            }
        }
    }

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    app.controller('MainController', MainController);
})();
