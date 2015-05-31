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
            vm.word.dictionary.dicDisplayName = "归属字典";
            vm.word.duiyingciList = [];
            vm.word.shiyi = "shiyi";
            vm.word.liju = "liju";
            vm.word.bianxing = "bianxing"
            vm.word.guanlianciList = [];
            vm.word.baike = "baike";
            vm.word.importFlag = false;
            vm.word.template = "pattern";
            vm.word.cixing = "词性";
            vm.word.xici = "";
            vm.word.author = $rootScope.currentUser;
           // vm.freeDescription = "init text"

            //vm.trustHtml =  $sce.trustAsHtml( vm.word.shiyi );

            /*

             vm.addDuiyingci = addDuiyingci;
             vm.addGuanlianci = addGuanlianci;
             vm.setDictionary = setDictionary;
             vm.setCiXing = setCiXing;
             vm.saveWord = saveWord;


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
            vm.tinymceShiyiOptions= {
                plugins: "textcolor,link,table",
                menubar: false,
                language: 'zh_CN',
                height: 100,
                statusbar: false,
                theme: "modern",
                skin: 'light',
                toolbar: [
                    "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright xuan zhen yi shen hu an qian chen hun zang",
                    "yang zhong yin xing | bubian | dong shi bei guofen xianfen bifen du | gu yin fo yu shu yue zhe shi shulun shenglun"
                ],
                //setup:initTinymceButtons,
                setup: initTinymceButtons
            };

            vm.duiyingciOptionList = [
               "<巴>","<犍>","<藏>","<于>","<蒙>","<夏>","<古>","<现>","<英>","<法>","<德>","<日>"
            ];

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

            function setDictionary(dictionary){
                vm.word.dictionary = dictionary;
            }

            function setCiXing(cixing){
                vm.word.cixing = cixing;
            }

            function saveWord(){
                vm.word.shiyi = tinyMCE.get('shiyiTiny').getContent();
                WordService.createNewWord(vm.word);
            }

            function initTinymceButtons(editor) {
                editor.addButton('yang', {text: '[阳]',icon: false,style:'padding: -10px',onclick:insertContent});
                editor.addButton('zhong', {text: '[中]',icon: false,onclick:insertContent});
                editor.addButton('yin', {text: '[阴]',icon: false,onclick:insertContent});
                editor.addButton('xing', {text: '[形]',icon: false,onclick:insertContent});
                editor.addButton('bubian', {text: '[不变]',icon: false,onclick:insertContent});
                editor.addButton('dong', {text: '[动]',icon: false,onclick:insertContent});
                editor.addButton('shi', {text: '[使]',icon: false,onclick:insertContent});
                editor.addButton('bei', {text: '[被]',icon: false,onclick:insertContent});
                editor.addButton('guofen', {text: '[过分]',icon: false,onclick:insertContent});
                editor.addButton('xianfen', {text: '[现分]',icon: false,onclick:insertContent});
                editor.addButton('bifen', {text: '[必分]',icon: false,onclick:insertContent});
                editor.addButton('gu', {text: '(古)',icon: false,onclick:insertContent});
                editor.addButton('yin', {text: '(音)',icon: false,onclick:insertContent});
                editor.addButton('fo', {text: '(佛)',icon: false,onclick:insertContent});
                editor.addButton('yu', {text: '(语)',icon: false,onclick:insertContent});
                editor.addButton('shu', {text: '(数)',icon: false,onclick:insertContent});
                editor.addButton('yue', {text: '(乐)',icon: false,onclick:insertContent});
                editor.addButton('zhe', {text: '(哲)',icon: false,onclick:insertContent});
                editor.addButton('shi', {text: '(诗)',icon: false,onclick:insertContent});
                editor.addButton('shulun', {text: '(数论)',icon: false,onclick:insertContent});
                editor.addButton('xuan', {text: '<玄>',icon: false,onclick:insertContent});
                editor.addButton('zhen', {text: '<真>',icon: false,onclick:insertContent});
                editor.addButton('yi', {text: '<义>',icon: false,onclick:insertContent});
                editor.addButton('shen', {text: '<什>',icon: false,onclick:insertContent});
                editor.addButton('hu', {text: '<护>',icon: false,onclick:insertContent});
                editor.addButton('an', {text: '<安>',icon: false,onclick:insertContent});
                editor.addButton('qian', {text: '<谦>',icon: false,onclick:insertContent});
                editor.addButton('chen', {text: '<谶>',icon: false,onclick:insertContent});
                editor.addButton('hun', {text: '<混>',icon: false,onclick:insertContent});
                editor.addButton('zang', {text: '<藏>',icon: false,onclick:insertContent});

                function insertContent() {
                    editor.insertContent(this.settings.text);
                }
            }*/
        }
})();
