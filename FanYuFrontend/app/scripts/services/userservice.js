'use strict';

/**
 * @ngdoc service
 * @name fanYuFrontendApp.userservice
 * @description
 * # userservice
 * Factory in the fanYuFrontendApp.
 */

(function () {
  angular.module('fanYuFrontendApp')
    .factory('UserService', UserService);

  UserService.$inject = ['$http','$rootScope'];

  function UserService($http,$rootScope) {
    var service = {
      getUserList: getUserList,
      createUser: createUser,
      deleteUser: deleteUser
    };
    return service;

    function getUserList() {
      //return $http.get('json/usertest.json')
      return $http.get(userURL)
        .then(getUserListComplete)
        .catch(getUserListFailed);

      function getUserListComplete(response) {
        return response.data;
      }

      function getUserListFailed(error) {
        console.error('XHR Failed for getUserListFailed.' + error.data);
      }
    };

    function createUser(user){
      return $http.post(userURL, user)
        .then(createUserComplete)
        .catch(createUserFailed);

      function createUserComplete(response){
        return response.data;
      }

      function createUserFailed(error){
        console.error('XHR Failed for createUserFailed.' + error.data);
      }
    }

    function deleteUser(){
      return $http.delete()
        .then(deleteUserComplete)
        .catch(deleteUserFailed);

      function deleteUserComplete(response){
        return response.data;
      }

      function deleteUserFailed(error){
        console.error('XHR Failed for deleteUserFailed.' + error.data);
      }
    }

  };
})();
