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
    NewwordsCtrl.$inject = ['$scope', 'WordService'];
    function NewwordsCtrl($scope, WordService) {
        var vm = this;

        vm.initNewWordList = initNewWordList;
        vm.isEdit = false;

        vm.newWordList = [];

        initNewWordList('Week', 1);

        function initNewWordList(period, periodCount) {
            vm.period = period;
            vm.periodCount = periodCount;
            refreshNewWordList(vm.period, vm.periodCount);
            $scope.$on('updateNewWordList', updateNewWordList);
        }

        function refreshNewWordList(period, periodCount) {
            vm.isEdit = false;
            WordService.getNewWords(vm.period, vm.periodCount).then(function (data) {
                vm.newWordList = data;
                console.warn(data);
            });
        }

        function updateNewWordList(){
            vm.isEdit = false;
        }
    }
})();
