/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
  'use strict';
  angular.module('fanYuFrontendApp')

    .controller('UsersCtrl', function ($scope, $rootScope, toastr, UserService) {
      var vm = this;
      //vm.name = "用户名";
      vm.userName = '';
      vm.roles = ["Admin", "Editor", "Reader"];

      vm.user = {};
      vm.user.userid = '';
      vm.user.username = '';
      vm.user.password = '';
      vm.passwordConfirm = '';
      vm.oldPassword = '';
      vm.user.displayName = '';
      vm.user.role = '';
      vm.user.allowedDictionaries = [];
      vm.allowedDictionariesBackup = [];
      vm.allowedDictionariesInPanel = [];
      vm.dictionary = {};
      vm.dictionary.dictionaryList = {};

      vm.userId = '';
      vm.userList = {};
      vm.pageCount = 0;
      vm.page = 1;
      vm.pageSize = 5;

      vm.isUserEdit = false;
      vm.add = add;
      vm.checkAll = checkAll;
      vm.checkAllValue = false;
      vm.checkRole = false;
      vm.selectFanList = selectFanList;
      vm.selectBaList = selectBaList;
      vm.selectZangList = selectZangList;
      vm.selectHanList = selectHanList;
      vm.selectDic = selectDic;
      vm.deleteUserConfirm = deleteUserConfirm;

      vm.nextPage = nextPage;
      vm.prePage = prePage;
      vm.specificPage = specificPage;

      vm.commitUser = commitUser;
      vm.editUser = editUser;
      vm.deleteUser = deleteUser;
      vm.saveUser = saveUser;
      vm.searchUser = searchUser;
      vm.checkUser = checkUser;
      vm.pushUserAllowedDictionaries = pushUserAllowedDictionaries;
      //vm.updateUserFromHeader = updateUserFromHeader;

      /*$scope.submitted = false;
      $scope.submitForm = function() {
        if ($scope.userForm.$valid) {
          // Submit as normal
        } else {
          $scope.userForm.submitted = true;
        }
      }*/
      getUserList();

      $scope.$watch('userVM.user.role', function(){
        if (vm.user.role == 'Admin') {
          vm.checkRole = true;
        } else {
          vm.checkRole = false;
        }
      });

      function refreshUserList() {
        UserService.getUserList(vm.page, vm.pageSize).then(function (response) {
          vm.userList = response.data;
          vm.pageCount = response.headers('pageCount');
          console.log("pageCoutn:"+vm.pageCount);
          vm.page =  response.headers('page');
        });
      }

      function nextPage(){
        if (vm.page < vm.pageCount) {
          vm.page ++;
          refreshUserList();
        }
      }

      function prePage(){
        if (vm.page > 1) {
          vm.page --;
          refreshUserList();
        }
      }

      function specificPage(page){
        vm.page = page;
        refreshUserList();
      }

      function getUserList() {
        UserService.getUserList(vm.page, vm.pageSize).then(function (response) {
          vm.userList = response.data;
          vm.pageCount = response.headers('pageCount');
          console.log("pageCoutn:"+vm.pageCount);
          vm.page =  response.headers('page');

          for (var ii in vm.userList) {
            console.log(vm.userList[ii].username);
            if (vm.userList[ii].username == 'cyc1'){
              console.log("---------------");
              for (var ji in vm.userList[ii].allowedDictionaries) {
                console.log("dict:" + vm.userList[ii].allowedDictionaries[ji].displayName);
              }
            }
          }

          //add checkbox for userlist
          for (var i in vm.userList) {
            vm.userList[i].checked = false;
          }
        });
      }

      function checkAll() {
        for (var i in vm.userList) {
          vm.userList[i].checked = vm.checkAllValue;
        }
      }

      function selectDic(event, dictionary){
        if(vm.allowedDictionariesInPanel == undefined){
          vm.allowedDictionariesInPanel = [];
        }
        //selected the dictionary
        if (event.target.checked) {
          var dic = {};
          dic.id = dictionary.id;
          dic.displayName = dictionary.displayName;
          //if selected dictionary is same as existing be able to edit dictionary in the panel loaded from db, don't puch
          for (var i in vm.allowedDictionariesInPanel) {
            if (dic.id === vm.allowedDictionariesInPanel[i].id) {
              //return to this function
              return;
            }
          }
          vm.allowedDictionariesInPanel.push(dic);
        } else {
          for (var i in vm.allowedDictionariesInPanel) {
            if (dictionary.id == vm.allowedDictionariesInPanel[i].id) {
              vm.allowedDictionariesInPanel.splice(i,1);
            }
          }
        }

      }

      function selectFanList() {
        //vm.dictionary.dictionaryList need define again, because before this function being called, no
        //vm.dictionary.dictionaryList = {};
        vm.dictionary.dictionaryList = $rootScope.fan_dictionaryList;
      }

      function selectBaList() {
        vm.dictionary.dictionaryList = $rootScope.ba_dictionaryList;
      }

      function selectZangList() {
        vm.dictionary.dictionaryList = $rootScope.zang_dictionaryList;
      }

      function selectHanList() {
        vm.dictionary.dictionaryList = $rootScope.han_dictionaryList;
      }

      function add() {
        vm.isUserEdit = false;
        vm.user = {};
        vm.passwordConfirm = '';
        vm.allowedDictionariesInPanel = [];
      }

      function editUser(user) {
        vm.user = user;
        vm.user.password = '';
        vm.passwordConfirm = '';
        vm.isUserEdit = true;

        /*将 vm.user.allowedDictionaries json数组的值 赋给 vm.allowedDictionariesInPanel，
        操作vm.allowedDictionariesInPanel 不会改变vm.user.allowedDictionaries
        若直接赋值，改变panel里的值，即使没保存，userList里的也会变*/
        vm.allowedDictionariesBackup = JSON.stringify(vm.user.allowedDictionaries);
        vm.allowedDictionariesInPanel = eval('('+vm.allowedDictionariesBackup+')');;
      }

      function deleteUserConfirm(userId) {
        vm.userId = userId;
      }

      function deleteUser() {
        UserService.deleteSingleUser(vm.userId).then(function (data) {
            if (data === 'success') {
              $('#deleteConfirmModal').modal('hide');
            }
            refreshUserList();
          }
        );
      }

      function commitUser() {
        if (vm.user.username == null || vm.user.username == '') {
          alert('用户名不能为空');
          form.userName.focus();
        } else if (vm.user.password == null || vm.user.password == '') {
          alert('密码不能为空');
        } else if (vm.passwordConfirm == null || vm.passwordConfirm == '') {
          alert('确认密码不能为空');
        } else if (vm.user.displayName == null || vm.user.displayName == '') {
          alert('昵称不能为空');
        } else if (vm.user.role == null || vm.user.role == '') {
          alert('必须选择用户角色');
        } else {
          UserService.searchUser(vm.user.username).then(function (data) {
            if (data != 'error') {
              alert('该用户名已经注册，请重新输入');
            } else {
              pushUserAllowedDictionaries();

              UserService.createUser(vm.user).then(function (data) {
                  console.log(data);
                  $('#addUserModal').modal('hide');
                  refreshUserList();
                }
              );
            }
          });

        }
      }

      function pushUserAllowedDictionaries() {
        if (vm.user.role == 'Admin') {
          if(vm.user.allowedDictionaries == undefined){
            vm.user.allowedDictionaries = [];
          }
          for (var ifan in $rootScope.fan_dictionaryList) {
            var dicf = {};
            dicf.id = $rootScope.fan_dictionaryList[ifan].id;
            dicf.displayName = $rootScope.fan_dictionaryList[ifan].displayName;
            vm.user.allowedDictionaries.push(dicf);
          }
          for (var iba in $rootScope.ba_dictionaryList) {
            var dicb = {};
            dicb.id = $rootScope.ba_dictionaryList[iba].id;
            dicb.displayName = $rootScope.ba_dictionaryList[iba].displayName;
            vm.user.allowedDictionaries.push(dicb);
          }
          for (var izang in $rootScope.zang_dictionaryList) {
            var dicz = {};
            dicz.id = $rootScope.zang_dictionaryList[izang].id;
            dicz.displayName = $rootScope.zang_dictionaryList[izang].displayName;
            vm.user.allowedDictionaries.push(dicz);
          }
          for (var ihan in $rootScope.han_dictionaryList) {
            var dich = {};
            dich.id = $rootScope.han_dictionaryList[ihan].id;
            dich.displayName = $rootScope.han_dictionaryList[ihan].displayName;
            vm.user.allowedDictionaries.push(dich);
          }
        } else {
          //vm.user needn't define again, because before this function being called, input for user.username and ... model already band
          //将panel 直接赋回给 vm.user.allowedDictionaries，此时不用借助变量
          vm.user.allowedDictionaries = vm.allowedDictionariesInPanel;
        }
      }

      /*function updateUserFromHeader() {
        vm.user = $rootScope.currentUser;
        UserService.checkPassword(vm.user.username, vm.oldPassword).then(function (response) {
          var data = response.data;
          console.log('status+++++++++++++++++'+ data);

          //check all the element in this 回调 function, 因为此回调函数始终在 alert密码不正确 后点击ok 再执行，那么在check密码时不对。因此在回调函数里check 所有element....
          if (vm.oldPassword == null || vm.oldPassword == '') {
            alert('旧密码不能为空');
          } else if (data == 'error') {
            alert('您输入的密码不正確');
          } else if (vm.user.password == null || vm.user.password == '') {
            alert('密码不能为空');
          } else if (vm.passwordConfirm == null || vm.passwordConfirm == '') {
            alert('确认密码不能为空');
          } else {
            UserService.updateUser(vm.user).then(function (data) {
                console.log(data);
                $('#updateCurrentUser').modal('hide');
                //location.reload();
                $.cookie("currentUser",JSON.stringify(data));
              }
            );
            vm.oldPassword = '';
            vm.passwordConfirm = '';
          }
        });
      }*/

      function saveUser() {

        if (vm.user.password == null || vm.user.password == '') {
          alert('密码不能为空');
        } else if (vm.passwordConfirm == null || vm.passwordConfirm == '') {
          alert('确认密码不能为空');
        } else if (vm.user.displayName == null || vm.user.displayName == '') {
          alert('昵称不能为空');
        } else if (vm.user.role == null || vm.user.role == '') {
          alert('必须选择用户角色');
/*        } else if (!vm.checkRole) {
          if (vm.allowedDictionariesInPanel == null || vm.allowedDictionariesInPanel == []) {
            alert('必须为用户分配可编辑词典');
          }*/
        } else {

          pushUserAllowedDictionaries();

          UserService.updateUser(vm.user).then(function (data) {
              console.log(data);
              $('#addUserModal').modal('hide');
              refreshUserList();
            }
          );
          //refreshUserList();
        }

      }

      function searchUser() {
        if (vm.userName == null || vm.userName == '') {
          getUserList();
        } else {
          UserService.searchUser(vm.userName).then(function (data) {
              if (data != 'error') {
                vm.userList = data;
              } else {
                vm.userList = {};
              }
              console.log(data);
            }
          );
        }
      }

      function checkUser() {
        if (vm.user.username == null || vm.user.username == '') {
          toastr.error('请输入用户名');
        } else {
          UserService.searchUser(vm.user.username).then(function (data) {
            if (data != 'error') {
              console.log(vm.user.username);
              toastr.error('该用户名已经注册，请重新输入');
              //alert('该用户名已经注册，请重新输入');
            } else {
              toastr.info('该用户名可用');
            }
          });
        }
      }


    });
})();



