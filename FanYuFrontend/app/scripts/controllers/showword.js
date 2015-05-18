/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:ShowwordCtrl
 * @description
 * # ShowwordCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('ShowwordCtrl', function ($scope, $state, $stateParams) {
            $scope.word = $stateParams.word;
            console.log($scope.word);
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        });
})();
