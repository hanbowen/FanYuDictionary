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

        vm.isEdit = false;
        vm.period = 'Week';
        vm.periodCount = 1;
        vm.page = 1;
        vm.pageSize = 3;
        vm.pageCount = 0;
        vm.newWordList = [];
        vm.nextPage = nextPage;
        vm.prePage = prePage;
        vm.specificPage = specificPage;
        vm.refreshNewWordList = refreshNewWordList;
        vm.deleteWord = deleteWord;


        refreshNewWordList();
        $scope.$on('updateWordSuccess', updateWordSuccess);

        function refreshNewWordList(period, periodCount) {
            if(period !== undefined) {
                vm.period = period;
                vm.periodCount = periodCount;
                vm.page = 1;
            }
            vm.isEdit = false;
            WordService.getNewWords(vm.period, vm.periodCount, vm.page, vm.pageSize).then(function (response) {
                vm.newWordList = response.data;
                vm.pageCount = response.headers('pageCount');
                vm.page =  response.headers('page');
            });
        }

        function deleteWord(wordId){
            WordService.deleteWord(wordId).then(function(data){
                if (data === 'success') {
                    refreshNewWordList();
                }
            });
        }

        function nextPage(){
            if (vm.page < vm.pageCount) {
                vm.page ++;
                refreshNewWordList();
            }
        }

        function prePage(){
            if (vm.page > 1) {
                vm.page --;
                refreshNewWordList();
            }
        }

        function specificPage(page){
            vm.page = page;
            refreshNewWordList();
        }

        function updateWordSuccess(d,wordId){
            console.log(wordId);
            for (var i in vm.newWordList) {
                if (vm.newWordList[i].id === wordId) {
                    vm.newWordList[i].isEdit = false;
                }
            }
        }
    }
})();
