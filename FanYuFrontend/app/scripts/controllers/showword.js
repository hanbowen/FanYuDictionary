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
        .controller('ShowwordCtrl', function ($scope, $state, $stateParams,WordService) {
            var vm = this;
            vm.word = $stateParams.word;
            vm.wordDetail = {};

            getWordDetail();

            function getWordDetail(){
                WordService.getWordDetail().then(function(data) {
                    vm.wordDetail = data;
                });
            }

        });
})();
