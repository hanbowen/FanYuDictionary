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
    .controller('UsersCtrl', function ($scope, UserService) {
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

      vm.userList = {};

      vm.isUserEdit = false;
      vm.add = add;
      vm.checkAll = checkAll;
      vm.checkAllValue = false;

      vm.commitUser = commitUser;
      vm.editUser = editUser;
      vm.deleteUser = deleteUser;
      vm.saveUser = saveUser;
      vm.searchUser = searchUser;

      getUserList();

      function getUserList() {
        UserService.getUserList().then(function (data) {
          vm.userList = data;
          for (var i in vm.userList) {
            vm.userList[i].checked = false;
          }
          console.log(vm.userList);
        });
      }

      function checkAll() {
        for (var i in vm.userList) {
          vm.userList[i].checked = vm.checkAllValue;
        }
      }

      function add() {
        vm.isUserEdit = false;
        vm.user = {};
      }

      function editUser(user) {
        vm.user = user;
        vm.user.password = "";
        vm.isUserEdit = true;
      }

      function deleteUser(userId) {
        UserService.deleteSingleUser(userId).then(function (data) {
            console.log(data);
            getUserList();
          }
        );
      }

      function commitUser() {
        UserService.createUser(vm.user).then(function (data) {
            console.log(data);
            getUserList();
          }
        );
      }

      function saveUser() {
        UserService.updateUser(vm.user).then(function (data) {
            console.log(data);
            getUserList();
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

    });
})();



