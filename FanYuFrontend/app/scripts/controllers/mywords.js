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
        .controller('MywordsCtrl',MywordsCtrl);

    MywordsCtrl.$inject = ['$scope','WordService'];

    function MywordsCtrl($scope,WordService) {
        var vm = this;

        vm.initMyWordList = initMyWordList;
        vm.isEdit = false;
        vm.myWordList = [];

        initMyWordList();

        function initMyWordList() {
            WordService.getMyWords('Month',1).then(function (data) {
                vm.myWordList = data;
                console.warn(data);
            });
        }
    }
})();
