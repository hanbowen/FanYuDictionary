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
                scope.logout = logout;
                scope.editUser = editUser;
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

                scope.changeIcon = function () {
                    scope.isBottomIcon = !scope.isBottomIcon;
                }

                scope.updateUserFromHeader = function () {
                    //vm.user = $rootScope.currentUser;
                    UserService.checkPassword($rootScope.currentUser.username, scope.oldPassword).then(function (response) {
                      var data = response.data;
                      console.log('status+++++++++++++++++'+ data);

                      //check all the element in this 回调 function, 因为此回调函数始终在 alert密码不正确 后点击ok 再执行，那么在check密码时不对。因此在回调函数里check 所有element....
                      if (scope.oldPassword == null || scope.oldPassword == '') {
                        alert('旧密码不能为空');
                      } else if (data == 'error') {
                        alert('您输入的密码不正確');
                      } else if ($rootScope.currentUser.password == null || $rootScope.currentUser.password == '') {
                        alert('密码不能为空');
                      } else if (scope.passwordConfirm == null || scope.passwordConfirm == '') {
                        alert('确认密码不能为空');
                      } else {
                        UserService.updateUser($rootScope.currentUser).then(function (data) {
                            console.log(data);
                            $('#updateCurrentUser').modal('hide');
                            //location.reload();
                            $.cookie("currentUser",JSON.stringify(data));
                          }
                        );
                        scope.oldPassword = '';
                        scope.passwordConfirm = '';
                      }
                    });
                };

                DictionaryService.getDictionaryList().then(function(){
                    initUserDicSequence();
                    initUserDicCheckList();
                });
            }
        };

        function logout(){
            $rootScope.currentUser = {};
            $.removeCookie("currentUser");
            $.removeCookie("token");
            location.reload();
        }

        function editUser(){
            $rootScope.currentUser.password = '';
            //$.removeCookie("currentUser");
        }

        function initUserDicSequence(){
            //如果response里面没有dicSequence先初始化
            if ($rootScope.currentUser == undefined) {
                $rootScope.currentUser = {};
            }
            if ($rootScope.currentUser.dicSequence == undefined) {
                $rootScope.currentUser.dicSequence = {};
            }
            if ($rootScope.currentUser.dicSequence.sequence == undefined) {
                $rootScope.currentUser.dicSequence.sequence = {};
                //初始化四个词典组的次序。
                for (var index in $rootScope.fan_dictionaryList) {
                    $rootScope.fan_dictionaryList[index].dicSequence = index;
                    $rootScope.currentUser.dicSequence.sequence[$rootScope.fan_dictionaryList[index].id] = $rootScope.fan_dictionaryList[index].dicSequence;
                }
                for (var index in $rootScope.ba_dictionaryList) {
                    $rootScope.ba_dictionaryList[index].dicSequence = index;
                    $rootScope.currentUser.dicSequence.sequence[$rootScope.ba_dictionaryList[index].id] = $rootScope.ba_dictionaryList[index].dicSequence;
                }
                for (var index in $rootScope.zang_dictionaryList) {
                    $rootScope.zang_dictionaryList[index].dicSequence = index;
                    $rootScope.currentUser.dicSequence.sequence[$rootScope.zang_dictionaryList[index].id] = $rootScope.zang_dictionaryList[index].dicSequence;
                }
                for (var index in $rootScope.han_dictionaryList) {
                    $rootScope.han_dictionaryList[index].dicSequence = index;
                    $rootScope.currentUser.dicSequence.sequence[$rootScope.han_dictionaryList[index].id] = $rootScope.han_dictionaryList[index].dicSequence;
                }
            } else {
                //初始化四个词典组的次序。
                for (var index in $rootScope.fan_dictionaryList) {
                    $rootScope.fan_dictionaryList[index].dicSequence =  $rootScope.currentUser.dicSequence.sequence[$rootScope.fan_dictionaryList[index].id];
                }
                for (var index in $rootScope.ba_dictionaryList) {
                    $rootScope.ba_dictionaryList[index].dicSequence = $rootScope.currentUser.dicSequence.sequence[$rootScope.ba_dictionaryList[index].id];
                }
                for (var index in $rootScope.zang_dictionaryList) {
                    $rootScope.zang_dictionaryList[index].dicSequence =  $rootScope.currentUser.dicSequence.sequence[$rootScope.zang_dictionaryList[index].id];
                }
                for (var index in $rootScope.han_dictionaryList) {
                    $rootScope.han_dictionaryList[index].dicSequence = $rootScope.currentUser.dicSequence.sequence[$rootScope.han_dictionaryList[index].id];
                }
            }

        }

        function updateUserDicSequence() {
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

            //如果userid为空则说明是路人，不进行user update操作。
            if($rootScope.currentUser.id != undefined) {
                UserService.updateUser($rootScope.currentUser).then(function (data) {
                    $.cookie('currentUser', JSON.stringify($rootScope.currentUser));
                    $rootScope.$emit('updateDicSequenceSuccess', '');
                });
            }

        }

        function initUserDicCheckList(){
            //如果response里面没有dicSequence先初始化
            if ($rootScope.currentUser == undefined) {
                $rootScope.currentUser = {};
            }
            if ($rootScope.currentUser.dicSequence == undefined) {
                $rootScope.currentUser.dicSequence = {};
            }
            if ($rootScope.currentUser.dicSequence.checkList == undefined) {
                $rootScope.currentUser.dicSequence.checkList = [];
                //默认梵语字典全选
                for (var i in $rootScope.fan_dictionaryList) {
                    addCheckItem($rootScope.fan_dictionaryList[i].id);
                }
            }
        }

        function updateUserDicCheckList(event, dictionaryId) {
            //选中则添加到checklist
            if (event.target.checked) {
                addCheckItem(dictionaryId);
            } else {
                removeCheckItem(dictionaryId);
            }

            //如果userid为空则说明是路人，不进行user update操作。
            if($rootScope.currentUser.id != undefined){
                UserService.updateUser($rootScope.currentUser).then(function (data) {
                    $.cookie('currentUser', JSON.stringify($rootScope.currentUser));
                });
            }
        }

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

    };


})();