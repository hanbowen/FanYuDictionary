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
        .controller('ShowwordCtrl', function ($scope,$rootScope, $state, $http,AuthHttp,$stateParams,WordService) {
            var vm = this;
            vm.word = $stateParams.word;
            vm.wordDetail = {};
            console.log("ShowwordCtrl");
            getWordDetail();

            function getWordDetail(){
                WordService.getWordDetail().then(function(data) {
                    vm.wordDetail = data;
                });


                /*AuthHttp('get','http://localhost:8080/FanYuDictionary/rest/dictionary',{}).then(function(data){
                    console.log(data.data);
                }).catch(function(error){
                   if(error.status == 0){
                      // alert("您没有权限进行此操作，重新登录重试，或联系管理员");
                   }
               });
                AuthHttp('get','http://localhost:8080/FanYuDictionary/rest/user',{}).then(function(data){
                    console.log(data.data);
                });*/

                $http.get(baseURL+'dictionary').then(function(data){
                    console.log(data.data);
                }).catch(function(error){
                    if(error.status == 0){
                        // alert("您没有权限进行此操作，重新登录重试，或联系管理员");
                    }
                });

                $http.get(baseURL+'user').then(function(data){
                    console.log(data.data);
                });
            }

        });
})();
