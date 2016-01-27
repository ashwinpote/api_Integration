'use strict';

angular.module('apiIntegrationApp', [
        'apiIntegrationApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ngDraggable',
        'ngAnimate',
        'ngScrollbars'
    ])
    .config(function($urlRouterProvider, $locationProvider, ScrollBarsProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        ScrollBarsProvider.defaults = {
            autoHideScrollbar: false,
            setHeight: 210,
            scrollInertia: 0,
            axis: 'yx',
            advanced: {
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            }
        };
    });
