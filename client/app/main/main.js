'use strict';

angular.module('apiIntegrationApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html'
      });
  });