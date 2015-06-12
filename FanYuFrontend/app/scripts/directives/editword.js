'use strict';

/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:createWord
 * @description
 * # createWord
 */
angular.module('fanYuFrontendApp')
    .directive('createWord', function () {
        var createWordDirectiveController = createWordDirectiveController;

        createWordDirectiveController.$inject = ['$scope', '$rootScope', '$sce', 'toastr', 'DictionaryService', 'WordService'];

        function createWordDirectiveController($scope, $rootScope, $sce, toastr, DictionaryService, WordService) {
            console.log("EiditwordCtrl");
            var vm = this;

            vm.addDuiyingci = addDuiyingci;
            vm.addGuanlianci = addGuanlianci;
            vm.setDictionary = setDictionary;
            vm.setCiXing = setCiXing;
            vm.saveWord = saveWord;
            vm.setShiyi = setShiyi;
            vm.removeGuanlianci = removeGuanlianci;
            vm.removeDuiyingci = removeDuiyingci;

            // vm.dictionaryList = dictionaryList;

            vm.wordSource = $scope.word;
            //备份修改前的word，update失败的时候恢复原来的word。
            var wordSourceStr = JSON.stringify(vm.wordSource);
            vm.word = eval('('+wordSourceStr+')');
            vm.freestyleShiyi = vm.word.shiyi;

            vm.newDuiyingciName = "";
            vm.newDuiyingciValue = "";
            vm.newGuanlianci = "";
            vm.tinymceOptions = {
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
                "<巴>", "<犍>", "<藏>", "<于>", "<蒙>", "<夏>", "<古>", "<现>", "<英>", "<法>", "<德>", "<日>"
            ];

            vm.shiyiShortcutButtons = ['[阳]', '[中]', '[阴]', '[形]', '[不变]', '[动]', '[使]', '[被]', '[过分]', '[现分]', '[必分]', '(古)', '(音)', '(佛)',
                '(语)', '(数)', '(乐)', '(哲)', '(诗)', '(数论)', '<玄>', '<真>', '<义>', '<什>', '<护>', '<安>', '<谦>', '<谶>', '<混>', '<藏>'];

            function addDuiyingci() {
                var newDuiyingci = {
                    name: vm.newDuiyingciName,
                    value: vm.newDuiyingciValue
                }
                for (var i in vm.word.duiyingciList) {
                    if (newDuiyingci.name == vm.word.duiyingciList[i].name) {
                        vm.word.duiyingciList[i] = newDuiyingci;
                        return;
                    }
                }
                vm.word.duiyingciList.push(newDuiyingci);
            }

            function removeDuiyingci(duiyingciName) {
                for (var i in vm.word.duiyingciList) {
                    if (duiyingciName == vm.word.duiyingciList[i].name) {
                        vm.word.duiyingciList.splice(i, 1);
                        return;
                    }
                }
            }

            function addGuanlianci() {
                for (var i in vm.word.guanlianciList) {
                    if (vm.newGuanlianci == vm.word.guanlianciList[i]) {
                        return;
                    }
                }
                vm.word.guanlianciList.push(vm.newGuanlianci);
            }

            function removeGuanlianci(guanlianci) {
                for (var i in vm.word.guanlianciList) {
                    if (guanlianci == vm.word.guanlianciList[i]) {
                        vm.word.guanlianciList.splice(i, 1);
                        return;
                    }
                }
            }

            function setDictionary(dictionary) {
                vm.word.dictionary = dictionary;
            }

            function setCiXing(cixing) {
                vm.word.cixing = cixing;
            }

            function saveWord() {
                //如果是freestyle的编辑方式，将其编辑内容存入shiyi中。（不能讲两个编辑框都绑定到word.shiyi,编辑器会出问题）
                if (vm.word.template == "freeStyle") {
                    vm.word.shiyi = vm.freestyleShiyi;
                }

                //判断是新建还是更新
                if (vm.word.id === undefined) {
                    WordService.createNewWord(vm.word);
                } else {
                    WordService.updateWord(vm.word).then(success).catch(fail);
                }
                function success(response) {
                    //编辑词条成功，发布成功事件。

                    cloneToWordSource(vm.word);
                    console.log("success:"+vm.word.shiyi);

                    $scope.$emit('updateWordSuccess', vm.word.id);
                    toastr.success('词条创建成功');
                }

                function fail(error) {
                    toastr.error('词条更新失败');
                }

                function cloneToWordSource(myObj){
                    for(var i in myObj)
                        $scope.word[i] = myObj[i];
                }

            }

            function setShiyi(btnText) {
                vm.word.shiyi = vm.word.shiyi + btnText;
            }
        }

        return {
            templateUrl: 'scripts/directives/templates/editWord.html',
            restrict: 'E',
            scope: {word: '='},
            controller: createWordDirectiveController,
            controllerAs: 'createVM'
        };
    });
