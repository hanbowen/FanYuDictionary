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
            vm.wordDetail = [];
            vm.deleteWord = deleteWord;
            vm.publishWord = publishWord;

            getWordDetail(vm.word);

            //通过事件订阅，当更新词条成功，则关闭编辑模式。
            $scope.$on('updateWordSuccess', updateWordSuccess);

            function getWordDetail(word) {
                WordService.getWordDetail(word).then(function (data) {
                    vm.wordDetail = data;
                });
            }

            function deleteWord(wordId){
                WordService.deleteWord(wordId).then(function(data){
                    if (data === 'success') {
                        getWordDetail(vm.word);
                    }
                });
            }

            function publishWord(wordId){
                console.error(wordId);
                WordService.publishWord(wordId).then(function(data){
                    if (data === 'success') {
                        getWordDetail(vm.word);
                    }
                });
            }

            //更新词条成功，关闭编辑模式
            function updateWordSuccess(d,wordId){
                console.log(wordId);
                for (var i in vm.wordDetail) {
                    if (vm.wordDetail[i].id === wordId) {
                        vm.wordDetail[i].isEdit = false;
                    }
                }
            }
        });
})();
