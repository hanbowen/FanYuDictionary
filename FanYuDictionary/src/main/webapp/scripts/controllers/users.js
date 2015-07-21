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
      vm.userName = "";
      vm.roles = ["Admin", "Editor", "Reader"];

      vm.user = {};
      vm.user.userid = '';
      vm.user.username = '';
      vm.user.password = '';
      vm.passwordConfirm = '';
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

      getUserList();

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
      }

      function editUser(user) {
        vm.user = user;
        vm.user.password = "";
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
        //vm.user needn't define again, because before this function being called, input for user.username and ... model already band
        UserService.createUser(vm.user).then(function (data) {
            console.log(data);
            $('#addUserModal').modal('hide');
            refreshUserList();
          }
        );
      }

      function saveUser() {
        //将panel 直接赋回给 vm.user.allowedDictionaries，此时不用借助变量
        vm.user.allowedDictionaries = vm.allowedDictionariesInPanel;

        UserService.updateUser(vm.user).then(function (data) {
            console.log(data);
            $('#addUserModal').modal('hide');
            refreshUserList();
          }
        );
      }

      function searchUser() {
        UserService.searchUser(vm.userName).then(function (data) {
            vm.userList = data;
            console.log(data);
          }
        );
      }

      function checkUser() {
        UserService.searchUser(vm.user.username).then(function (data) {
          if (data != '') {
            console.log(vm.user.username);
            toastr.error('该用户名已经注册，请重新输入');
          }
/*          else {
            toastr.success('该用户名可用');
          }*/
        });
      }

    });
})();



