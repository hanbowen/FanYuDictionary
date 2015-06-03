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
            console.log("ShowwordCtrl");
            getWordDetail(vm.word);

            //通过事件订阅，当更新词条成功，则关闭编辑模式。
            $scope.$on('updateWordSuccess', updateWordSuccess);

            function getWordDetail(word) {
                WordService.getWordDetail(word).then(function (data) {
                    vm.wordDetail = data;
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
