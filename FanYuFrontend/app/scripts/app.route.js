/**
 * Created by Bowen on 2015/5/13.
 *
 * 用来设置页面的路由信息，根据url映射不同的controller和template html.
 */
(function () {
    'use strict'
    angular
        .module('fanYuFrontendApp')
        .config(function ($stateProvider, $urlRouterProvider) {
            // For any unmatched url, send to /route1
            $urlRouterProvider.otherwise("/dictionary")
            $stateProvider
                .state('dictionary', {
                    url: '/dictionary',
                    templateUrl: 'views/dictionary.html',
                    controller: 'DictionaryCtrl',
                    authenticate: false
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .state('dictionary.showWord', {
                    url: '/{word:(.)}',
                    templateUrl: 'views/showword.html',
                    controller: 'ShowwordCtrl',
                    controllerAs: 'showWordVM'
                })
                .state('manage', {
                    url: '/manage',
                    templateUrl: 'views/manage.html',
                    controller: 'ManageCtrl',
                    authenticate: true
                })
                .state('manage.newWords', {
                    url: '/newWords',
                    templateUrl: 'views/newwords.html',
                    controller: 'NewwordsCtrl',
                    controllerAs: 'vm'
                })
                .state('manage.users', {
                    url: '/users',
                    templateUrl: 'views/users.html',
                    controller: 'UsersCtrl',
                    controllerAs: 'userVM'
                })
                .state('manage.myWords', {
                    url: 'myWords',
                    templateUrl: 'views/mywords.html',
                    controller: 'MywordsCtrl'
                })
                .state('manage.createWord', {
                    url: '/createWord',
                    templateUrl: 'views/createword.html',
                    controller: 'CreatewordCtrl',
                    controllerAs: 'createVM'
                })
                .state('manage.managedictionary', {
                  url: '/managerDict',
                  templateUrl: 'views/managedictionary.html',
                  controller: 'ManagedictionaryCtrl',
                  controllerAs: 'dictionaysVM'
                })
        });
   // $httpProvider.responseInterceptors.push('SecurityHttpInterceptor');
})();