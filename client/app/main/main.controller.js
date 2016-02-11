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
            $scope.mainresult = [];
            $scope.mainresult1 = [];
            $scope.mainresult2 = [];

            $scope.scrollbarConfig = {
                theme: 'dark',
                scrollInertia: 500
            }

            $interval(function() {
                if (obj.check_twitter) {
                    twitter.collSearch.forEach(function(value, key) {
                        twitter.callapiInterval(value).then(function(data) {
                            $scope.mainresult2[key] = data;
                        });
                    });
                }
                if (obj.check_googleplus) {
                    googleplus.collSearch.forEach(function(value, key) {
                        googleplus.callapiInterval(value).then(function(data) {
                            $scope.mainresult[key] = data.items;
                        });
                    });
                }
                if (obj.check_youtube) {
                    youtubeService.collSearch.forEach(function(value, key) {
                        youtubeService.callapiInterval(value).then(function(data) {
                            $scope.mainresult1[key] = data.items;
                        });
                    });
                }
            }, 15000);

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
                                $scope.mainresult.push(data.items);
                                $scope.currValue = "Google+";
                                obj.check_googleplus = true;
                                $scope.reslCount = data.items.length;
                            });
                            $scope.selIcon = "fa fa-google-plus-square gplusicon";
                        }
                        break;
                    case "Twitter":
                        if (twitter.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in twitter search list!';
                        } else {
                            $scope.errorMsg = "";
                            twitter.search(searchText).then(function(data) {
                                $scope.mainresult2.push(data);
                                $scope.currValue = "Twitter";
                                obj.check_twitter = true;
                                $scope.reslCount = data.length;
                            });
                            $scope.selIcon = "fa fa-twitter-square twiticon";
                        }
                        break;
                    case "Youtube":
                        if (youtubeService.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in Youtube search list!';
                        } else {
                            $scope.errorMsg = "";
                            youtubeService.search(searchText).then(function(data) {
                                $scope.mainresult1.push(data.items);
                                $scope.currValue = "Youtube";
                                obj.check_youtube = true;
                                $scope.reslCount = data.items.length;
                            });
                            $scope.selIcon = "fa fa-youtube-square youtubeicon";
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
