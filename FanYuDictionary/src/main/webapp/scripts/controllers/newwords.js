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
        vm.pageSize = 6;
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

        /**** start add by cy 0831 ******/
        vm.wordId = '';
        vm.isDeleteAll = false;
        vm.isPublishAll = false;
        vm.deleteWordConfirm = deleteWordConfirm;
        vm.deleteAllConfirm = deleteAllConfirm;
        vm.publishWordConfirm = publishWordConfirm;
        vm.publishAllConfirm = publishAllConfirm;
        /**** end add by cy 0831 ******/

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

        /**** start add or edit by cy 0831 ******/
        function deleteWordConfirm(wordId) {
          vm.wordId = wordId;
          vm.isDeleteAll = false;
        }

        function deleteWord() {
            WordService.deleteWord(vm.wordId).then(function (data) {
                if (data === 'success') {
                    $('#deleteNewWordConfirmModal').modal('hide');
                    refreshNewWordList();
                }
            });
        }

        function publishWordConfirm(wordId) {
          vm.wordId = wordId;
          vm.isPublishAll = false;
        }

        function publishWord(wordId) {
            WordService.publishWord(vm.wordId).then(function (data) {
                if (data === 'success') {
                    $('#pubulishNewWordConfirmModal').modal('hide');
                    refreshNewWordList();
                }
            });
        }

        function publishAllConfirm() {
          vm.isPublishAll = true;
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
                    $('#pubulishNewWordConfirmModal').modal('hide');
                    refreshNewWordList();
                }
            });
        }

        function deleteAllConfirm() {
          vm.isDeleteAll = true;
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
                    $('#deleteNewWordConfirmModal').modal('hide');
                    refreshNewWordList();
                }
            });
        }
        /**** end add or edit by cy 0831 ******/

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
