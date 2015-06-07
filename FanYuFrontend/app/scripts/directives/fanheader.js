/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:fanHeader
 * @description
 * # fanHeader
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('fanHeader', fanHeader);

    fanHeader.$inject = ['$rootScope', 'DictionaryService', 'UserService'];

    function fanHeader($rootScope, DictionaryService, UserService) {
        return {
            templateUrl: 'scripts/directives/templates/fanHeader.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.updateUserDicCheckList = updateUserDicCheckList;
                scope.sortableFanOptions = {
                    stop: function (e, ui) {
                        for (var index in $rootScope.fan_dictionaryList) {
                            $rootScope.fan_dictionaryList[index].dicSequence = index;
                        }
                        updateUserDicSequence();
                    }
                };
                scope.sortableBaOptions = {
                    stop: function (e, ui) {
                        for (var index in $rootScope.ba_dictionaryList) {
                            $rootScope.ba_dictionaryList[index].dicSequence = index;
                        }
                        updateUserDicSequence();
                    }
                };
                scope.sortableZangOptions = {
                    stop: function (e, ui) {
                        for (var index in $rootScope.zang_dictionaryList) {
                            $rootScope.zang_dictionaryList[index].dicSequence = index;
                        }
                        updateUserDicSequence();
                    }
                };
                scope.sortableHanOptions = {
                    stop: function (e, ui) {
                        for (var index in $rootScope.han_dictionaryList) {
                            $rootScope.han_dictionaryList[index].dicSequence = index;
                        }
                        updateUserDicSequence();
                    }
                };
                DictionaryService.getDictionaryList();
            }
        };

        function updateUserDicSequence() {
            //如果response里面没有dicSequence先初始化
            if ($rootScope.currentUser.dicSequence == undefined) {
                $rootScope.currentUser.dicSequence = {};
            }
            if ($rootScope.currentUser.dicSequence.sequence == undefined) {
                $rootScope.currentUser.dicSequence.sequence = {};
            }

            var sequence = {};
            //Ugly code!
            for (var i in $rootScope.fan_dictionaryList) {
                sequence[$rootScope.fan_dictionaryList[i].id] = $rootScope.fan_dictionaryList[i].dicSequence;
            }
            for (var i in $rootScope.ba_dictionaryList) {
                sequence[$rootScope.ba_dictionaryList[i].id] = $rootScope.ba_dictionaryList[i].dicSequence;
            }
            for (var i in $rootScope.zang_dictionaryList) {
                sequence[$rootScope.zang_dictionaryList[i].id] = $rootScope.zang_dictionaryList[i].dicSequence;
            }
            for (var i in $rootScope.han_dictionaryList) {
                sequence[$rootScope.han_dictionaryList[i].id] = $rootScope.han_dictionaryList[i].dicSequence;
            }

            $rootScope.currentUser.dicSequence.sequence = sequence;

            UserService.updateUser($rootScope.currentUser).then(function (data) {
                $.cookie('currentUser', JSON.stringify($rootScope.currentUser));
                $rootScope.$emit('updateDicSequenceSuccess', '');
            });

        }

        function updateUserDicCheckList(event, dictionaryId) {
            //如果response里面没有dicSequence先初始化
            if ($rootScope.currentUser.dicSequence == undefined) {
                $rootScope.currentUser.dicSequence = {};
            }
            if ($rootScope.currentUser.dicSequence.checkList == undefined) {
                $rootScope.currentUser.dicSequence.checkList = [];
            }
            //选中则添加到checklist
            if (event.target.checked) {
                addCheckItem(dictionaryId);
            } else {
                removeCheckItem(dictionaryId);
            }

            UserService.updateUser($rootScope.currentUser).then(function (data) {
                $.cookie('currentUser', JSON.stringify($rootScope.currentUser));
            });

            function addCheckItem(dictionaryId){
                if ( $rootScope.currentUser.dicSequence.checkList.indexOf(dictionaryId) == -1) {
                    $rootScope.currentUser.dicSequence.checkList.push(dictionaryId);
                }
            }

            function removeCheckItem(dictionaryId){
                for (var i in $rootScope.currentUser.dicSequence.checkList) {
                    if ($rootScope.currentUser.dicSequence.checkList[i] == dictionaryId) {
                        //splice 删除数组中第i个元素
                        $rootScope.currentUser.dicSequence.checkList.splice(i,1);
                        break;
                    }
                }
            }
        }
    };
})();