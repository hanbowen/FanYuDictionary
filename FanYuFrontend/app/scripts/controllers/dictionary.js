/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:DictionaryCtrl
 * @description
 * # DictionaryCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('DictionaryCtrl', DictionaryCtrl);
    DictionaryCtrl.$inject = ['$scope','WordService'];
    function DictionaryCtrl($scope,WordService) {
        var vm = this;

        vm.searchResult = [];

        vm.typeSpecialChar = typeSpecialChar;
        vm.setSearchCode = setSearchCode;
        vm.setSearchMatch = setSearchMatch;
        vm.setSearchDomain = setSearchDomain;
        vm.searchWord = searchWord;

        vm.search = {};
        vm.search.searchWord = "";
        vm.search.code = "Unicode";
        vm.search.match = "shou";
        vm.search.domain = "danci";

        vm.softKeys = ["ā","ī","ū","ṛ","ṝ","ḷ","ḹ","ṃ","ḥ","ṅ","ñ","ṭ","ḍ","ṇ","ś","ṣ"];
        vm.codeList = [
            {
                codeName: "HK",
                codeValue: "HK",
                checked: false
            },
            {
                codeName: "Unicode",
                codeValue: "Unicode",
                checked: true
            },
            {
                codeName: "模糊",
                codeValue: "mohu",
                checked: false
            }
        ];

        vm.matchList = [
            {
                matchName: "首",
                matchValue: "shou",
                checked: true
            },
            {
                matchName: "尾",
                matchValue: "wei",
                checked: false
            },
            {
                matchName: "中",
                matchValue: "zhong",
                checked: false
            },
            {
                matchName: "精确",
                matchValue: "jingque",
                checked: false
            }
        ];

        vm.domainList = [
            {
                domainName: "单词",
                domainValue: "danci",
                checked: true
            },
            {
                domainName: "对应词",
                domainValue: "duiyingci",
                checked: false
            },
            {
                domainName: "变形",
                domainValue: "bianxing",
                checked: false
            },
            {
                domainName: "例句",
                domainValue: "lijv",
                checked: false
            },
            {
                domainName: "全文",
                domainValue: "quanwen",
                checked: false
            }
        ];


        function typeSpecialChar(event){
            vm.search.searchWord += $(event.target).text().trim();
            $("#searchInput").focus();
        }

        function setSearchCode(codeValue){
            vm.search.code = codeValue;
        }

        function setSearchMatch(matchValue){
            vm.search.match = matchValue;
        }

        function setSearchDomain(domianValue){
            vm.search.domain = domianValue;
        }

        function searchWord(){
            WordService.searchWord(vm.search).then(function(data){
                vm.searchResult = data;
                //$('.searchResult').first().trigger('click');
            });
        }
    }
})();
