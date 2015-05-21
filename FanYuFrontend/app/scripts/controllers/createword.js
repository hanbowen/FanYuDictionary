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

        CreatewordCtrl.$inject = ['$scope','$rootScope','$sce','DictionaryService'];

        function CreatewordCtrl($scope, $rootScope, $sce, DictionaryService) {
            var vm = this;

            vm.addDuiyingci = addDuiyingci;
            vm.addGuanlianci = addGuanlianci;
            vm.setDictionary = setDictionary;

            vm.word = {};
            vm.word.dictionary = {};
            vm.word.dictionary.dicDisplayName = "归属字典";
            vm.word.duiyingciList = [];
            vm.word.shiyi = "shiyi";
            vm.word.liju = "liju";
            vm.word.guanlianciList = [];
            vm.word.baike = "baike";
            vm.word.importFlag = false;
            vm.word.template = "pattern";
            vm.freeDescription = "init text";

            //vm.trustHtml =  $sce.trustAsHtml( vm.word.shiyi );

            vm.newDuiyingciName = "";
            vm.newDuiyingciValue = "";
            vm.newGuanlianci = "";
            vm.tinymceOptions= {
                plugins: "textcolor,link,table",
                menubar: false,
                language: 'zh_CN',
                height: 100,
                statusbar: false,
                theme: "modern",
                skin: 'light',
                toolbar: [
                    "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                ]
            };
            vm.duiyingciOptionList = [
               "<巴>","<犍>","<藏>","<于>","<蒙>","<夏>","<古>","<现>","<英>","<法>","<德>","<日>"
            ];

            //richEditorInit();

            function addDuiyingci(){
                var newDuiyingci = {
                    name: vm.newDuiyingciName,
                    value: vm.newDuiyingciValue
                }
                console.log(newDuiyingci);
                vm.word.duiyingciList.push(newDuiyingci);
            }

            function addGuanlianci(){
                vm.word.guanlianciList.push(vm.newGuanlianci);
            }
          /*  function richEditorInit() {
                tinymce.init({
                    plugins: "textcolor,link,table",
                    menubar: false,
                    language: 'zh_CN',
                    height: 300,
                    statusbar: false,
                    selector: '#freestyleInput',
                    theme: "modern",
                    skin: 'light',
                    toolbar: [
                        "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                    ]
                });
                tinymce.init({
                    plugins: "textcolor,link,table",
                    menubar: false,
                    language: 'zh_CN',
                    height: 100,
                    statusbar: false,
                    selector: '#shiyiTextArea',
                    theme: "modern",
                    skin: 'light',
                    toolbar: [
                        "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                    ]
                });
                tinymce.init({
                    plugins: "textcolor,link,table",
                    menubar: false,
                    language: 'zh_CN',
                    height: 100,
                    statusbar: false,
                    selector: '#lijvArea',
                    theme: "modern",
                    skin: 'light',
                    toolbar: [
                        "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                    ]
                });
                tinymce.init({
                    plugins: "textcolor,link,table",
                    menubar: false,
                    language: 'zh_CN',
                    height: 100,
                    statusbar: false,
                    selector: '#baikeArea',
                    theme: "modern",
                    skin: 'light',
                    toolbar: [
                        "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                    ]
                });
            }*/
            function setDictionary(dictionary){
                vm.word.dictionary = dictionary;
            }
        }
})();
