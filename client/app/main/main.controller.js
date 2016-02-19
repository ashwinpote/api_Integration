'use strict';
(function() {
    class MainController {
        constructor(googleplus, twitter, youtubeService, $scope, $location, $window, $interval) {

            var currSelect = "";
            var obj = {};
            obj.currArr = [];
            obj.searchText = [];
            $scope.showInputControls = true;
            $scope.mainresult = [];
            $scope.loader = { "Google+": false, "Twitter": false, "Youtube": false };

            $scope.scrollbarConfig = {
                theme: 'dark',
                scrollInertia: 500
            }

            $interval(function() {
                $scope.mainresult.forEach(function(value, key) {
                    var api = $scope.mainresult[key][parseInt(value.length - 1)];
                    var searchtext = $scope.mainresult[key][parseInt(value.length - 2)];
                    if (api == "Google+") {
                        $scope.loader[key] = true;
                        googleplus.callapiInterval(searchtext).then(function(data) {
                            $scope.mainresult[key] = data.items.concat(searchtext, api);
                            $scope.loader[key] = false;

                        });
                    } else if (api == "Youtube") {
                        $scope.loader[key] = true;
                        youtubeService.callapiInterval(searchtext).then(function(data) {
                            $scope.mainresult[key] = data.items.concat(searchtext, api);
                            $scope.loader[key] = false;
                        });
                    } else if (api == "Twitter") {
                        $scope.loader[key] = true;
                        twitter.callapiInterval(searchtext).then(function(data) {
                            $scope.mainresult[key] = data.concat(searchtext, api);
                            $scope.loader[key] = false;
                        });
                    }
                });
            }, 10000);

            $scope.onChanged = function(param) {
                currSelect = $scope.optionValue;
                $scope.trends = "";
                $scope.errorMsg = "";
            }

            $scope.search = function() {
                var searchText = angular.lowercase($scope.trends);
                $scope.searchWord = searchText;
                switch (currSelect) {
                    case "Google+":
                        if (googleplus.collSearch.contains(searchText)) {
                            $scope.errorMsg = searchText + ' already exists in Google+ search list!';
                        } else {
                            $scope.errorMsg = "";
                            googleplus.search(searchText).then(function(data) {
                                $scope.mainresult.push(data.items.concat(searchText, "Google+",data.items.length));
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
                                $scope.mainresult.push(data.concat(searchText, "Twitter"));
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
                                $scope.mainresult.push(data.items.concat(searchText, "Youtube"));
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
            $scope.removeField = function(index, event) {
                $scope.mainresult.splice(index, 1);
                switch (event.target.dataset.selapi) {
                    case 'Google+':
                        googleplus.collSearch.splice(index, 1);
                        break;
                    case 'Twitter':
                        twitter.collSearch.splice(index, 1);
                        break;
                    case 'Youtube':
                        youtubeService.collSearch.splice(index, 1);
                        break;
                }
            }
        }
    }
    app.controller('MainController', MainController);
})();
