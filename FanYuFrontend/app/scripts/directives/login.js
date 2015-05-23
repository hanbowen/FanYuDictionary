/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:login
 * @description
 * # login
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('login', login);

    function login() {
        return {
            templateUrl: 'scripts/directives/templates/login.html',
            restrict: 'E'
        };
    }
})();