/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:CreatewordCtrl
 * @description
 * # CreatewordCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('CreatewordCtrl', CreatewordCtrl);

        CreatewordCtrl.$inject = ['$scope','$rootScope','$sce','DictionaryService','WordService'];

        function CreatewordCtrl($scope, $rootScope, $sce, DictionaryService, WordService) {
            var defaultDictionary = '梵汉大字典';
            var vm = this;

            vm.word = {};
            vm.word.dictionary = {};
            vm.word.dictionary.displayName = "归属字典";
            //设置默认辞典。 $watch会在fan_dictionaryList发生变化时执行函数。
            $scope.$watch('fan_dictionaryList', function(){
                for (var i in $rootScope.fan_dictionaryList) {
                    if ($rootScope.fan_dictionaryList[i].displayName === defaultDictionary) {
                        vm.word.dictionary = $rootScope.fan_dictionaryList[i];
                        break;
                    }
                }
            });

            vm.word.duiyingciList = [];
            vm.word.shiyi = "shiyi";
            vm.word.liju = "liju";
            vm.word.bianxing = "bianxing";
            vm.word.guanlianciList = [];
            vm.word.baike = "baike";
            vm.word.importFlag = false;
            vm.word.template = "pattern";
            vm.word.cixing = "词性";
            vm.word.xici = "";
            vm.word.cigenlaiyuan = '';
            vm.word.author = $rootScope.currentUser;

        }
})();
