/**
 * @ngdoc overview
 * @name fanYuFrontendApp
 * @description
 * # fanYuFrontendApp
 *
 * Main module of the application.
 */
(function () {
    'use strict';
    var currentUserRole;
    angular.element(document).ready(function () {
        //在这里首先要call获取用户权限的api，然后才能启动angular的编译，所以使用angular.bootstrap()方法人工出发编译。
        //注意：使用angular.bootstrap人工编译的时候，要去掉index.html页面的“ng-app”属性，否则将会绕过自动编译，然后又执行一次人工编译..
        /* $.get('json/permission.json', function (data) {
         currentUserRole = data;
         angular.bootstrap(document, ['fanYuFrontendApp']);
         });*/
        var currentUser = $.cookie("currentUser");
        if(currentUser != null){
            var currentUserObj = eval("("+currentUser+")");
            currentUserRole = currentUserObj.role;
        }else{
            currentUserRole = "Reader"
        }
        angular.bootstrap(document, ['fanYuFrontendApp']);
    });

    angular
        .module('fanYuFrontendApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'ui.tinymce',
            'toastr',
            'ui.sortable'
        ]).config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                positionClass: 'toast-top-center',
                newestOnTop: true,
                timeOut: 2000
            });
        })
        .run(function ($rootScope, $location, $state, AuthenticationService) {
            AuthenticationService.setUserRole(currentUserRole);
            var currentUser = $.cookie("currentUser");
            if(currentUser != null)
                $rootScope.currentUser = eval("("+currentUser+")");
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !AuthenticationService.isUrlAuthenticated()) {
                    // User isn’t authenticated
                    $state.transitionTo("dictionary");
                    event.preventDefault();
                }
            });
        });

})();