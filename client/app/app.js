'use strict';

var app = angular.module('apiIntegrationApp', [
  'apiIntegrationApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider,$stateProvider) {
    $urlRouterProvider
      .otherwise('/');

   $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'myController'
      });
  });