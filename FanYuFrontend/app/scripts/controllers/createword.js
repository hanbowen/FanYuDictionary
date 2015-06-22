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

            vm.word.duiyingciList = [];
            vm.word.word = "";
            vm.word.shiyi = "";
            vm.word.liju = "";
            vm.word.bianxing = "";
            vm.word.guanlianciList = [];
            vm.word.baike = "";
            vm.word.importFlag = false;
            vm.word.template = "pattern";
            vm.word.cixing = "词性";
            vm.word.xici = "";
            vm.word.cigenlaiyuan = '';
            vm.word.author = $rootScope.currentUser;

        }
})();
