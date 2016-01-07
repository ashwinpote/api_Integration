'use strict';

var app = angular.module('apiIntegrationApp', [
  'apiIntegrationApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');

   $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'myController'
      });
  });

  app.config(['GooglePlusProvider', function(GooglePlusProvider) {
         GooglePlusProvider.init({
           clientId: '266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com',
           apiKey: 'AIzaSyAnMX4jucCO6omqJLTUZ4lkqZtDUY_cX2o'
         });
    }]);