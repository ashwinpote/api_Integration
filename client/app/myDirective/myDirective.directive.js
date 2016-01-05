'use strict';

angular.module('apiIntegrationApp')
  .directive('myDirective', function () {
    return {
      templateUrl: 'app/myDirective/myDirective.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
