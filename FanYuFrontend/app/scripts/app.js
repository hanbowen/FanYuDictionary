'use strict';

/**
 * @ngdoc overview
 * @name fanYuFrontendApp
 * @description
 * # fanYuFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('fanYuFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
    .config(function($stateProvider, $urlRouterProvider){

            // For any unmatched url, send to /route1



            $urlRouterProvider.otherwise("/dictionary")

            $stateProvider
                .state('dictionary', {
                    url:'/dictionary',
                    templateUrl: 'views/dictionary.html',
                    controller: 'DictionaryCtrl'
                })
                .state('dictionary.about', {
                    url:'/about',
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .state('dictionary.showWord', {
                    url:'/{word:(.)}',
                    templateUrl: 'views/showword.html',
                    controller: 'ShowwordCtrl'
                })
                .state('manage', {
                    url:'/manage',
                    templateUrl: 'views/manage.html',
                    controller: 'ManageCtrl'
                })
                .state('manage.newWords', {
                    url:'newWords',
                    templateUrl: 'views/newwords.html',
                    controller: 'NewwordsCtrl'
                })
                .state('manage.users', {
                    url:'users',
                    templateUrl: 'views/users.html',
                    controller: 'UsersCtrl'
                })
                .state('manage.myWords', {
                    url:'myWords',
                    templateUrl: 'views/mywords.html',
                    controller: 'MywordsCtrl'
                })
                .state('manage.createWord', {
                    url:'/createWord',
                    templateUrl: 'views/createword.html',
                    controller: 'CreatewordCtrl'
                })

        });