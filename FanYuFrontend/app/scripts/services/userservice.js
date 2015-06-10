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
      deleteSingleUser: deleteSingleUser,
      updateUser: updateUser,
      searchUser: searchUser
    };
    return service;

    function getUserList(page, pageSize) {
      //return $http.get('json/usertest.json')
      return $http.get(userURL + '?page=' + page + '&pageSize=' + pageSize)
        .then(getUserListComplete)
        .catch(getUserListFailed);
      function getUserListComplete(response) {
        return response;
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

    function deleteSingleUser(userId){
      return $http.delete(userURL + '/' + userId)
        .then(deleteUserComplete)
        .catch(deleteUserFailed);
      function deleteUserComplete(response){
        return response.data;
      }
      function deleteUserFailed(error){
        console.error('XHR Failed for deleteUserFailed.' + error.data);
      }
    }

    function updateUser(user){
      if (user.id == undefined) {
          return "";
      }
      return $http.put(userURL + '/' + user.id, user)
        .then(updateUserComplete)
        .catch(updateUserFailed);
      function updateUserComplete(response){
        return response.data;
      }
      function updateUserFailed(error){
        console.error('XHR Failed for updateUserFailed.' + error.data);
      }
    }

    function searchUser(username){
      return $http.get(userURL + '/' + username)
        .then(searchUserComplete)
        .catch(searchUserFailed);
      function searchUserComplete(response){
        return response.data;
      }
      function searchUserFailed(error){
        console.error('XHR Failed for searchUserFailed.' + error.data);
      }
    }

  };
})();
