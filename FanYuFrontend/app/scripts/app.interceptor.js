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
            $httpProvider.interceptors.push(function($q) {
                return {
                    'request': function(config) {
                        //拦截每次请求，添加token；
                        if($.cookie('token') != null && config.url.indexOf(loginURI)<0)
                            config.url = config.url+"?token=" + encodeURIComponent($.cookie('token'));
                        return config;
                    },

                    'requestError': function(rejection) {
                        return $q.reject(rejection);
                    },

                    //拦截每次成功的response，重置token
                    'response': function(response) {
                        if(response.headers('token') != null){
                            $.cookie("token",response.headers('token'));
                        }
                        return response;
                    },

                    'responseError': function(rejection) {
                        if(rejection.status == 403){
                           console.warn("您没有权限进行此操作，请重新登录或联系管理员");
                        }
                        return $q.reject(rejection);
                    }
                };
            });

        }]);

})();