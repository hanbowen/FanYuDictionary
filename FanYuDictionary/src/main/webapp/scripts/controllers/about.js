/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('AboutCtrl', function ($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        });
})();
