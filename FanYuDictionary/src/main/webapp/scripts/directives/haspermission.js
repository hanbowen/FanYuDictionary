/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:hasPermission
 * @description
 * # hasPermission
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('hasPermission', function ($rootScope,AuthenticationService) {
            return {
                link: function (scope, element, attrs) {
                    hideAndShowElements();
                    function hideAndShowElements() {
                        var permitRoles = attrs.hasPermission.split(" ");
                        if (AuthenticationService.hasElementPermission(permitRoles))
                            element.removeClass("hide");
                        else
                            element.remove();
                    }

                    if ($rootScope.currentUser != undefined && $rootScope.currentUser.role == "Editor") {
                        hideToEditors();
                    }
                    function hideToEditors() {
                        var word = eval('(' + attrs.isEditable + ')');
                        if (word != undefined) {
                            if ($rootScope.currentUser != undefined && $rootScope.currentUser.id === word.author.id)
                                element.removeClass("hide");
                            else
                                element.remove();
                        }
                    }
                }

                /*   hideAndShowElements();
                 function hideAndShowElements() {
                 if ($rootScope.currentUser != undefined && $rootScope.currentUser.id === word.author.id)
                 element.removeClass("hide");
                 else
                 element.remove();
                 }*/
            }
        });
})();