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
        .controller('MywordsCtrl', MywordsCtrl);

    MywordsCtrl.$inject = ['$scope', '$rootScope', 'WordService'];

    function MywordsCtrl($scope, $rootScope, WordService) {
        var vm = this;

        vm.refreshMyWordList = refreshMyWordList;
        vm.nextPage = nextPage;
        vm.prePage = prePage;
        vm.specificPage = specificPage;
        vm.deleteWord = deleteWord;
        vm.publishWord = publishWord;
        vm.publishAll = publishAll;
        vm.deleteAll = deleteAll;

        vm.myWordList = [];
        vm.page = 1;
        vm.pageSize = 3;
        vm.pageCount = 0;

        vm.selectAll = selectAll;
        vm.selectAllFalg = false;

        /**** start add by cy 0826 ******/
        vm.wordId = '';
        vm.isDeleteAll = false;
        vm.isPublishAll = false;
        vm.deleteWordConfirm = deleteWordConfirm;
        vm.deleteAllConfirm = deleteAllConfirm;
        vm.publishWordConfirm = publishWordConfirm;
        vm.publishAllConfirm = publishAllConfirm;
        /**** end add by cy 0826 ******/

        refreshMyWordList();
        $scope.$on('updateWordSuccess', updateWordSuccess);

        function refreshMyWordList() {
            WordService.getMyWords($rootScope.currentUser.id, vm.page, vm.pageSize).then(function (response) {
                vm.myWordList = response.data;
                vm.pageCount = response.headers('pageCount');
                vm.page = response.headers('page');

            });
        }

        /**** start add or edit by cy 0826 ******/
        function deleteWordConfirm(wordId) {
            vm.wordId = wordId;
            vm.isDeleteAll = false;
        }

        function deleteWord() {
            WordService.deleteWord(vm.wordId).then(function (data) {
                if (data === 'success') {
                    $('#deleteMyWordConfirmModal').modal('hide');
                }
                refreshMyWordList();
            });
        }

        function deleteAllConfirm() {
            vm.isDeleteAll = true;
        }

        function deleteAll(){
          var deleteList = [];
          for (var i in vm.newWordList) {
            if (vm.newWordList[i].checked) {
              deleteList.push(vm.newWordList[i].id);
            }
          }
          WordService.deleteAll(deleteList).then(function (data) {
            if (data === 'success') {
                $('#deleteMyWordConfirmModal').modal('hide');
                refreshNewWordList();
            }
          });
        }

        function publishWordConfirm(wordId) {
            vm.wordId = wordId;
            vm.isPublishAll = false;
        }

        function publishWord() {
          WordService.publishWord(vm.wordId).then(function (data) {
            if (data === 'success') {
                $('#pubulishMyWordConfirmModal').modal('hide');
                refreshMyWordList();
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
              $('#pubulishMyWordConfirmModal').modal('hide');
              refreshNewWordList();
            }
          });
        }
        /**** end add or edit by cy 0826 ******/

        function nextPage() {
            if (vm.page < vm.pageCount) {
                vm.page++;
                refreshMyWordList();
            }
        }

        function prePage() {
            if (vm.page > 1) {
                vm.page--;
                refreshMyWordList();
            }
        }

        function specificPage(page) {
            vm.page = page;
            refreshMyWordList();
        }


        function updateWordSuccess(d, wordId) {
            console.log(wordId);
            for (var i in vm.myWordList) {
                if (vm.myWordList[i].id === wordId) {
                    vm.myWordList[i].isEdit = false;
                }
            }
        }

        function selectAll() {
            for (var i in  vm.myWordList) {
                vm.myWordList[i].checked = !vm.selectAllFalg;
            }
            vm.selectAllFalg = !vm.selectAllFalg;
        }
    }
})();
