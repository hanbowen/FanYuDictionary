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
        vm.search.match = "prefix";
        vm.search.domain = "word";

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
                codeValue: "vague",
                checked: false
            }
        ];

        vm.matchList = [
            {
                matchName: "首",
                matchValue: "prefix",
                checked: true
            },
            {
                matchName: "尾",
                matchValue: "suffix",
                checked: false
            },
            {
                matchName: "中",
                matchValue: "middle",
                checked: false
            },
            {
                matchName: "精确",
                matchValue: "accurate",
                checked: false
            }
        ];

        vm.domainList = [
            {
                domainName: "单词",
                domainValue: "word",
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
            console.log(vm.search.code);
        }

        function setSearchMatch(matchValue){
            vm.search.match = matchValue;
            console.log(vm.search.match);
        }

        function setSearchDomain(domianValue){
            vm.search.domain = domianValue;
            console.log(vm.search.domain);
        }

        function searchWord(){
            WordService.searchWord(vm.search).then(function(data){
                console.log(data);
                vm.searchResult = data;
            });
        }
    }
})();
