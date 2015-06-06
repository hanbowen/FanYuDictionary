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
            var vm = this;

            vm.word = {};
            vm.word.dictionary = {};
            vm.word.dictionary.displayName = "归属字典";
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
