'use strict';

var app = angular.module('apiIntegrationApp', [
    'apiIntegrationApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngScrollbars',
    'ngDraggable'
]);

app.config(function($urlRouterProvider, $locationProvider, ScrollBarsProvider) {
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

app.constant('config', {
    googleClientId: '266935583518-0otsvqdm1eekgr9htkca8lfla26k1l90.apps.googleusercontent.com',
    googleApiKey: 'AIzaSyAnMX4jucCO6omqJLTUZ4lkqZtDUY_cX2o',
    googlePlusScope: 'https://www.googleapis.com/auth/plus.me',
    googleYoutubeScope: 'https://www.googleapis.com/auth/youtube',
    twitterApiKey: 'oEcDIQahkO4TUAND-yTs-H6oY_M'
});
