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
      vm.searchUser = "";
      vm.roles = ["Admin", "Editor", "Reader"];

      vm.user = {};
      vm.user.username = "";
      vm.user.password = "";
      vm.passwordConfirm = "";
      vm.user.displayName = "";
      vm.user.role = "";

      vm.userList = {};
      vm.checkAll = checkAll;
      vm.checkAllValue = false;
      vm.commitUser = commitUser;

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

      function commitUser() {
        UserService.createUser(vm.user).then(function (data) {
            console.log(data);
          }
        );
      }

    });
})();



