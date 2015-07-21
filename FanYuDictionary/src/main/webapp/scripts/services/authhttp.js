'use strict';

/**
 * @ngdoc service
 * @name fanYuFrontendApp.AuthHttp
 * @description
 * # AuthHttp
 * Factory in the fanYuFrontendApp.
 */
angular.module('fanYuFrontendApp')
    .factory('AuthHttp', function ($http) {
        return function (method, url, args) {
            var token = $.cookie('token');
            if(token != null){
                url = url + "?token="+encodeURIComponent(token);
            }
            // Return the $http promise as normal, as if we had just
            // called get or post
            return $http[ method ](url,args);
        };

    });
