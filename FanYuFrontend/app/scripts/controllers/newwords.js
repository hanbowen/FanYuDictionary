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
    NewwordsCtrl.$inject = ['$scope','WordService'];
    function NewwordsCtrl($scope,WordService) {
        var vm = this;
        vm.newWordList = [];

        initNewWordList();

        function initNewWordList(){
            WordService.getNewWords().then(function(data){
                vm.newWordList = data;
                console.warn(data);
            });
        }
    }
})();
