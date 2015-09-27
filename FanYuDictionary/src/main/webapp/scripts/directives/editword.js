'use strict';

/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:createWord
 * @description
 * # createWord
 */
angular.module('fanYuFrontendApp')
    .directive('createWord', createWord);

function createWord() {
    var createWordDirectiveController = createWordDirectiveController;

    createWordDirectiveController.$inject = ['$scope', '$rootScope', '$sce', 'toastr', 'DictionaryService', 'WordService'];

    function createWordDirectiveController($scope, $rootScope, $sce, toastr, DictionaryService, WordService) {

        $scope.dicEditAuth = dicEditAuth;
        var vm = this;
        vm.addDuiyingci = addDuiyingci;
        vm.addGuanlianci = addGuanlianci;
        vm.setDictionary = setDictionary;
        vm.setCiXing = setCiXing;
        vm.saveWord = saveWord;
        vm.setShiyi = setShiyi;
        vm.removeGuanlianci = removeGuanlianci;
        vm.removeDuiyingci = removeDuiyingci;
        vm.typeSpecialChar = typeSpecialChar;
        vm.changeIcon = changeIcon;
        vm.isBottomIcon = false;

        // 四类字典初始化；
        vm.fan_dictionaryList = [];
        vm.ba_dictionaryList = [];
        vm.zang_dictionaryList = [];
        vm.han_dictionaryList = [];
        $scope.$watch('fan_dictionaryList', function () {
            for (var i in $rootScope.fan_dictionaryList) {
                if (dicEditAuth($rootScope.fan_dictionaryList[i])) {
                    vm.fan_dictionaryList.push($rootScope.fan_dictionaryList[i]);
                    //设置默认辞典。如果当前没有设置默认词典也就是id为undefined，或者为所设置的默认词典时，给word.dictionary赋值。
                    if (vm.word.dictionary.id == undefined || $rootScope.fan_dictionaryList[i].displayName === defaultDictionary) {
                        vm.word.dictionary = $rootScope.fan_dictionaryList[i];
                    }
                }
            }
            for (var i in $rootScope.ba_dictionaryList) {
                if (dicEditAuth($rootScope.ba_dictionaryList[i])) {
                    vm.ba_dictionaryList.push($rootScope.ba_dictionaryList[i]);
                    //设置默认辞典。如果当前没有设置默认词典也就是id为undefined，或者为所设置的默认词典时，给word.dictionary赋值。
                    if (vm.word.dictionary.id == undefined || $rootScope.ba_dictionaryList[i].displayName === defaultDictionary) {
                        vm.word.dictionary = $rootScope.ba_dictionaryList[i];
                    }
                }

            }
            for (var i in $rootScope.zang_dictionaryList) {
                if (dicEditAuth($rootScope.zang_dictionaryList[i])) {
                    vm.zang_dictionaryList.push($rootScope.zang_dictionaryList[i]);
                    //设置默认辞典。如果当前没有设置默认词典也就是id为undefined，或者为所设置的默认词典时，给word.dictionary赋值。
                    if (vm.word.dictionary == {} || $rootScope.zang_dictionaryList[i].displayName === defaultDictionary) {
                        vm.word.dictionary = $rootScope.zang_dictionaryList[i];
                    }
                }

            }
            for (var i in $rootScope.han_dictionaryList) {
                /*if (vm.word.dictionary.id == undefined || $rootScope.han_dictionaryList[i].displayName === defaultDictionary) {
                    vm.zang_dictionaryList.push($rootScope.han_dictionaryList[i]);
                    //设置默认辞典。如果当前没有设置默认词典也就是id为undefined，或者为所设置的默认词典时，给word.dictionary赋值。
                    if (vm.word.dictionary.id == undefined || $rootScope.han_dictionaryList[i].displayName === defaultDictionary) {
                        vm.word.dictionary = $rootScope.han_dictionaryList[i];
                    }
                }*/
                if (dicEditAuth($rootScope.han_dictionaryList[i])) {
                  vm.han_dictionaryList.push($rootScope.han_dictionaryList[i]);
                  //设置默认辞典。如果当前没有设置默认词典也就是id为undefined，或者为所设置的默认词典时，给word.dictionary赋值。
                  if (vm.word.dictionary == {} || $rootScope.han_dictionaryList[i].displayName === defaultDictionary) {
                    vm.word.dictionary = $rootScope.han_dictionaryList[i];
                  }
                }
            }
        });


        vm.wordSource = $scope.word;
        //备份修改前的word，update失败的时候恢复原来的word。
        var wordSourceStr = JSON.stringify(vm.wordSource);
        vm.word = eval('(' + wordSourceStr + ')');
        vm.freestyleShiyi = vm.word.shiyi;

        vm.newDuiyingciName = "";
        vm.newDuiyingciValue = "";
        vm.newGuanlianci = "";

        vm.tinymceOptions = {
            plugins: "textcolor,link,table,code",
            menubar: false,
            language: 'zh_CN',
            statusbar: false,
            theme: "modern",
            skin: 'light',
            toolbar: [
                "undo redo | link unlink | bold italic forecolor backcolor | table | image | code | alignleft aligncenter alignright"
            ]
        };

        vm.softKeys = ["ā", "ī", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "ṃ", "ḥ", "ṅ", "ñ", "ṭ", "ḍ", "ṇ", "ś", "ṣ"];

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
            if (vm.word.duiyingciList === undefined) {
                vm.word.duiyingciList = [];
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

        function changeIcon () {
            vm.isBottomIcon = !vm.isBottomIcon;
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
                $scope.$emit('updateWordSuccess', vm.word.id);
                toastr.success('词条创建成功');
            }

            function fail(error) {
                toastr.error('词条更新失败');
            }

            function cloneToWordSource(myObj) {
                for (var i in myObj)
                    $scope.word[i] = myObj[i];
            }

        }

        //释义的软键盘输入。
        function setShiyi(btnText) {
            vm.word.shiyi = vm.word.shiyi + btnText;
        }

        function typeSpecialChar(event) {
            vm.word.word += $(event.target).text().trim();
            $("#searchInput").focus();
        }

        //这是一个filter，用来过滤掉不能编辑的辞典。
        function dicEditAuth(dic) {
            //如果是Admin则直接不过滤，返回true；
            if ($rootScope.currentUser.role == 'Admin') {
                return true;
            }
            for (var i in  $rootScope.currentUser.allowedDictionaries) {
                if ($rootScope.currentUser.allowedDictionaries[i].id === dic.id) {
                    return true;
                }
            }
            return false;
        };

    }

    return {
        templateUrl: 'scripts/directives/templates/editWord.html',
        restrict: 'E',
        scope: {word: '='},
        controller: createWordDirectiveController,
        controllerAs: 'createVM'
    };
}
