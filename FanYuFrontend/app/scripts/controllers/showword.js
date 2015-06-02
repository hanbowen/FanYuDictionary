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
        .controller('ShowwordCtrl', function ($scope, $rootScope, $state, $http, AuthHttp, $stateParams, WordService) {
            var vm = this;
            vm.word = $stateParams.word;
            vm.wordDetail = {};
            console.log("ShowwordCtrl");
            getWordDetail(vm.word);

            function getWordDetail(word) {
                WordService.getWordDetail(word).then(function (data) {
                    vm.wordDetail = data;
                });
            }

        });
})();
