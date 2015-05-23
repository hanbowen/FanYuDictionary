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
        .controller('ShowwordCtrl', function ($scope, $state, $http,$stateParams,WordService) {
            var vm = this;
            vm.word = $stateParams.word;
            vm.wordDetail = {};
            console.log("ShowwordCtrl");
            getWordDetail();

            function getWordDetail(){

                WordService.getWordDetail().then(function(data) {
                    vm.wordDetail = data;
                });
               /* $http.get("http://localhost:8080/FanYuDictionary/rest/helloworld").then(function(data){
                    console.log(data.data);
                })*/
            }

        });
})();
