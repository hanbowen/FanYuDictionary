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
                    controllerAs: 'dicVM',
                    authenticate: false
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl',
                    authenticate: false
                })
                .state('dictionary.showWord', {
                    url: '/{word:(.)}',
                    templateUrl: 'views/showword.html',
                    controller: 'ShowwordCtrl',
                    controllerAs: 'showWordVM',
                    authenticate: false
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
                    controllerAs: 'vm',
                    authenticate: true
                })
                .state('manage.users', {
                    url: '/users',
                    templateUrl: 'views/users.html',
                    controller: 'UsersCtrl',
                    controllerAs: 'userVM',
                    authenticate: true
                })
                .state('manage.myWords', {
                    url: '/myWords',
                    templateUrl: 'views/mywords.html',
                    controller: 'MywordsCtrl',
                    controllerAs: 'vm',
                    authenticate: true
                })
                .state('manage.createWord', {
                    url: '/createWord',
                    templateUrl: 'views/createword.html',
                    controller: 'CreatewordCtrl',
                    controllerAs: 'createVM',
                    authenticate: true
                })
                .state('manage.managedictionary', {
                  url: '/managerDict',
                  templateUrl: 'views/managedictionary.html',
                  controller: 'ManagedictionaryCtrl',
                  controllerAs: 'dictionaysVM',
                  authenticate: true
                })
        });
   // $httpProvider.responseInterceptors.push('SecurityHttpInterceptor');
})();