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
      getUserList: getUserList
    };
    return service;

    function getUserList() {
      return $http.get('json/usertest.json')
        .then(getUserListComplete)
        .catch(getUserListFailed);

      function getUserListComplete(response) {
        return response.data;
      }

      function getUserListFailed(error) {
        console.error('XHR Failed for getUserListFailed.' + error.data);
      }

    };

  };
})();
