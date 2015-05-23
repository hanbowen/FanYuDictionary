/**
 * @ngdoc service
 * @name fanYuFrontendApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the fanYuFrontendApp.
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .factory('AuthenticationService', function () {
            // Service logic
            // ...
            var role = "";
            // Public API here
            return {
                setPermissionList: function (userRole) {
                    role = userRole;
                },
                isUrlAuthenticated: function () {
                    console.log("isUrlAuthenticated : " + role);
                    if (role == "Admin" || role == "Editor")
                        return true;
                    else
                        return false;
                },

                hasElementPermission: function (permitRoles) {
                    for (var i in permitRoles) {
                        if (role == permitRoles[i])
                            return true;
                    }
                    return false;
                }
            };
        });

})();
