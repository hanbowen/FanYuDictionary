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
        .module('fanYuFrontendApp')
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total, 10);
                for (var i = 1; i <= total; ++i) {
                    input.push(i);
                }
                return input;
            };
        })
        //转化model中的富文本为可显示的html；
        .filter('unsafe', function ($sce) {
            return $sce.trustAsHtml;
        });
})();