'use strict';

/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:MywordsCtrl
 * @description
 * # MywordsCtrl
 * Controller of the fanYuFrontendApp
 */
angular.module('fanYuFrontendApp')
  .controller('MywordsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
