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
    .controller('UsersCtrl', function ($scope, $rootScope, UserService) {
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
      vm.user.dictionary = {};
      vm.user.dictionary.dicGroup = '';
      vm.user.dictionary.dictionaryList = {};
      vm.user.dictionary.dictionaryGroup = [];

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

      vm.nextPage = nextPage;
      vm.prePage = prePage;
      vm.specificPage = specificPage;

      vm.commitUser = commitUser;
      vm.editUser = editUser;
      vm.deleteUser = deleteUser;
      vm.saveUser = saveUser;
      vm.searchUser = searchUser;

      refreshUserList();

      function refreshUserList() {
        UserService.getUserList(vm.page, vm.pageSize).then(function (response) {
          vm.userList = response.data;
          vm.pageCount = response.headers('pageCount');
          console.log("pageCoutn:"+vm.pageCount);
          vm.page =  response.headers('page');
          //add checkbox for userlist
          for (var i in vm.userList) {
            vm.userList[i].checked = false;
          }
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

      function getUserList(page, pageSize) {
        UserService.getUserList().then(function (data) {
          vm.userList = data;
          for (var i in vm.userList) {
            vm.userList[i].checked = false;
          }
          console.log(vm.userList);
        });

        //add checkbox value for all dictionary
        for (var ii in $rootScope.fan_dictionaryList) {
          $rootScope.fan_dictionaryList[i].checked = false;
        }
        for (var jj in $rootScope.ba_dictionaryList) {
          $rootScope.ba_dictionaryList[jj].checked = false;
        }
        for (var kk in $rootScope.zang_dictionaryList) {
          $rootScope.zang_dictionaryList[kk].checked = false;
        }
        for (var ll in $rootScope.han_dictionaryList) {
          $rootScope.han_dictionaryList[ll].checked = false;
        }
      }

      function checkAll() {
        for (var i in vm.userList) {
          vm.userList[i].checked = vm.checkAllValue;
        }
      }

      function selectFanList() {
        vm.user.dictionary = {};

        vm.user.dictionary.dictionaryList = $rootScope.fan_dictionaryList;

        for (var ii in vm.user.dictionary.dictionaryList) {
          console.log('-------------------');
          console.log(vm.user.dictionary.dictionaryList[ii].checked);
          console.log('+++++++++++++++++++++++');
          if (vm.user.dictionary.dictionaryList[ii].checked === true) {
            vm.user.dictionary.dictionaryGroup.push(vm.user.dictionary.dictionaryList[ii]);
          }
        }

        console.log('+++++++++++++++');
        console.log(vm.user.dictionary.dictionaryGroup);
        console.log('+++++++++++++++');
      }

      function selectBaList() {
        vm.user.dictionary.dictionaryList = $rootScope.ba_dictionaryList;
      }

      function selectZangList() {
        vm.user.dictionary.dictionaryList = $rootScope.zang_dictionaryList;
      }

      function selectHanList() {
        vm.user.dictionary.dictionaryList = $rootScope.han_dictionaryList;
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
            refreshUserList();
          }
        );
      }

      function commitUser() {
        UserService.createUser(vm.user).then(function (data) {
            console.log(data);
            refreshUserList();
          }
        );
      }

      function saveUser() {
        UserService.updateUser(vm.user).then(function (data) {
            console.log(data);
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

      /*      $( '.dropdown-menu a' ).on( 'click', function( event ) {

              var $target = $( event.currentTarget ),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;

              if ( ( idx = options.indexOf( val ) ) > -1 ) {
                options.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
              } else {
                options.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
              }

              $( event.target ).blur();

              console.log( options );
              return false;
            });*/

    });
})();



