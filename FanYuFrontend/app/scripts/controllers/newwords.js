/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:NewwordsCtrl
 * @description
 * # NewwordsCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('NewwordsCtrl', NewwordsCtrl);
    NewwordsCtrl.$inject = ['$scope','WordService'];
    function NewwordsCtrl($scope,WordService) {
        var vm = this;

        vm.initNewWordList = initNewWordList;
        vm.newWordList = [];

        initNewWordList('Month',1);

        function initNewWordList(period, periodCount) {
            WordService.getNewWords(period, periodCount).then(function (data) {
                vm.newWordList = data;
                console.warn(data);
            });
        }
    }
})();
