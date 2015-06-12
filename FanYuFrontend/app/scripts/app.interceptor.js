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
            $httpProvider.defaults.headers.put ={ 'Content-Type': 'text/plain; charset=unicode' };
            $httpProvider.defaults.headers.post ={ 'Content-Type': 'text/plain; charset=unicode' };
            $httpProvider.interceptors.push(function($q,$rootScope) {
                return {
                    'request': function(config) {
                        $rootScope.showSplash = true;
                        //拦截每次请求，添加token；
                        if($.cookie('token') != null && config.url.indexOf(loginURI)<0  && config.url.indexOf("rest")>=0){
                            if(config.url.indexOf("?")<0)
                                config.url = config.url+"?token=" + encodeURIComponent($.cookie('token'));
                            else
                                config.url = config.url+"&token=" + encodeURIComponent($.cookie('token'));
                        }

                        return config;
                    },

                    'requestError': function(rejection) {
                        $rootScope.showSplash = true;
                        return $q.reject(rejection);
                    },

                    //拦截每次成功的response，重置token
                    'response': function(response) {
                        $rootScope.showSplash = false;
                        if(response.headers('token') != null){
                            $.cookie("token",response.headers('token'));
                        }
                        return response;
                    },

                    'responseError': function(rejection) {
                        $rootScope.showSplash = false;
                        console.error("Interceptor: 您没有权限进行此操作，请重新登录或联系管理员");
                        return $q.reject(rejection);
                    }
                };
            });

        }]);

})();