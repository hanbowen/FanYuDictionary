/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:MywordsCtrl
 * @description
 * # MywordsCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('MywordsCtrl', function ($scope) {
            console.log("MywordsCtrl");
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        });
})();
