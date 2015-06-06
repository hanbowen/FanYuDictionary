/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:fanHeader
 * @description
 * # fanHeader
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('fanHeader', fanHeader);

    fanHeader.$inject = ['$rootScope','DictionaryService'];

    function fanHeader($rootScope, DictionaryService) {
        return {
            templateUrl: 'scripts/directives/templates/fanHeader.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.sortableOptions = {
                    update: function(e, ui) {
                       console.log(scope.list);
                    },
                    stop: function(e, ui) {
                        console.log(scope.list);
                    }
                };
                DictionaryService.getDictionaryList();
            }
        };
    };
})();