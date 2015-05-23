/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:hasPermission
 * @description
 * # hasPermission
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('hasPermission', function (AuthenticationService) {
            return {
                link: function (scope, element, attrs) {
                    var permitRoles = attrs.hasPermission.split(" ");
                    hideAndShowElements();
                    function hideAndShowElements() {
                        if (AuthenticationService.hasElementPermission(permitRoles))
                            element.removeClass("hide");
                        else
                            element.remove();
                    }
                }
            }
        });
})();