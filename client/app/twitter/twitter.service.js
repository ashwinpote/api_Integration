'use strict';

angular.module('apiIntegrationApp')
    .service('twitter', function($q) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var obj = {}
        obj.init = function() {
            OAuth.initialize('4/X00Lpp6s-kkYy5rq6KsEFG-LmfUR4veHO5Qp1c-k4xs')
        }
        obj.search = function(q) {
            var deferred = $q.defer();
         //   console.log(deferred);
         //   OAuth.redirect('twitter', 'https://api.twitter.com/oauth/authenticate?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0');
            OAuth.popup('google', function(err, google) {

                var search = encodeURIComponent(q)
                console.log(google);
                google.get('/1.1/search/tweets.json?q=' + search).done(function(data) {
                  //  console.log(data);
                    var returnData = data.statuses.map(function(d) {
                        return {
                            desp: d.text
                        }
                    })
                    deferred.resolve(returnData);
                })
               // console.log(returnData);

            })

            return deferred.promise;
            // console.log(deferred.promise);
        }
        return obj
    });
