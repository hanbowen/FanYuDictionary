'use strict';

/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:isEditable
 * @description
 * # isEditable
 */
angular.module('fanYuFrontendApp')
    .directive('isEditable', isEditable);

isEditable.$inject = ['$rootScope'];

function isEditable($rootScope) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            console.log( attrs.isEditable);
            var word = eval('('+attrs.isEditable+')');
            hideAndShowElements();
            function hideAndShowElements() {
                if ($rootScope.currentUser.id === word.author.id)
                    element.removeClass("hide");
                else
                    element.remove();
            }
        }
    };
}
