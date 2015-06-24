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
        vm.publishWord = publishWord;
        vm.publishAll = publishAll;
        vm.deleteAll = deleteAll;
        vm.selectAll = selectAll;
        vm.sorting = sorting;
        vm.selectAllFalg = false;
        vm.orderBy = 'date';
        vm.orderSequence = 'desc';
        vm.order = {
            word: '',
            date: 'desc',
            status: '',
            author: ''
        };
        refreshNewWordList();
        $scope.$on('updateWordSuccess', updateWordSuccess);

        function refreshNewWordList(period, periodCount) {
            if (period !== undefined) {
                vm.period = period;
                vm.periodCount = periodCount;
                vm.page = 1;
            }
            vm.isEdit = false;
            WordService.getNewWords(vm.period, vm.periodCount, vm.page, vm.pageSize).then(function (response) {
                vm.newWordList = response.data;
                vm.pageCount = response.headers('pageCount');
                vm.page = response.headers('page');
            });
        }

        function deleteWord(wordId) {
            WordService.deleteWord(wordId).then(function (data) {
                if (data === 'success') {
                    refreshNewWordList();
                }
            });
        }

        function publishWord(wordId) {
            WordService.publishWord(wordId).then(function (data) {
                if (data === 'success') {
                    refreshNewWordList();
                }
            });
        }

        function publishAll() {
            var publishList = [];
            for (var i in vm.newWordList) {
                if (vm.newWordList[i].checked) {
                    publishList.push(vm.newWordList[i].id);
                }
            }
            WordService.publishAll(publishList).then(function (data) {
                if (data === 'success') {
                    refreshNewWordList();
                }
            });
        }

        function deleteAll() {
            var deleteList = [];
            for (var i in vm.newWordList) {
                if (vm.newWordList[i].checked) {
                    deleteList.push(vm.newWordList[i].id);
                }
            }
            WordService.deleteAll(deleteList).then(function (data) {
                if (data === 'success') {
                    refreshNewWordList();
                }
            });
        }

        function nextPage() {
            if (vm.page < vm.pageCount) {
                vm.page++;
                refreshNewWordList();
            }
        }

        function prePage() {
            if (vm.page > 1) {
                vm.page--;
                refreshNewWordList();
            }
        }

        function specificPage(page) {
            vm.page = page;
            refreshNewWordList();
        }

        function updateWordSuccess(d, wordId) {
            for (var i in vm.newWordList) {
                if (vm.newWordList[i].id === wordId) {
                    vm.newWordList[i].isEdit = false;
                }
            }
        }

        function selectAll() {
            for (var i in  vm.newWordList) {
                vm.newWordList[i].checked = !vm.selectAllFalg;
            }
            vm.selectAllFalg = !vm.selectAllFalg;
        }

        function sorting(orderBy) {
            //如果当前排序与点击排序不同，则清除然后重新设置当前排序。
            if (vm.orderBy != orderBy) {
                vm.order[vm.orderBy] = '';
                vm.orderBy = orderBy;
            }

            if (vm.order[orderBy] == '' || vm.order[orderBy] == 'desc') {
                vm.order[orderBy] = 'asc';
                vm.orderSequence = 'asc';
            } else {
                vm.order[orderBy] = 'desc';
                vm.orderSequence = 'desc';
            }

        }
    }
})();
