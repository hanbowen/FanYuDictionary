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
    angular
        .module('fanYuFrontendApp').
        config(["$httpProvider", function($httpProvider){
            console.log("interceptor");
            $httpProvider.interceptors.push(function($q,$rootScope) {
                return {
                    'request': function(config) {
                        //拦截每次请求，添加token；
                        if($.cookie('token') != null)
                            config.url = config.url+"?token=" + $.cookie('token');
                        return config;
                    },

                    'requestError': function(rejection) {
                        return $q.reject(rejection);
                    },

                    //拦截每次成功的response，重置token
                    'response': function(response) {
                        if(response.headers('token') != null){
                            $.cookie("token",$rootScope.token);
                        }
                        return response;
                    },

                    'responseError': function(rejection) {
                        if(rejection.status == 0){
                           console.warn("您没有权限进行此操作，重新登录或联系管理员");
                        }
                        return $q.reject(rejection);
                    }
                };
            });

        }]);

})();