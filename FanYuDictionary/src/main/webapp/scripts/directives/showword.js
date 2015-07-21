/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:showWord
 * @description
 * # showWord
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('showWord', showWord);

    function showWord() {
        var showWordDirectiveController = showWordDirectiveController;

        showWordDirectiveController.$inject = ['$scope', '$sce'];

        function showWordDirectiveController($scope, $sce) {
            var vm = this;
            vm.word = $scope.word;
        }

        return {
            templateUrl: 'scripts/directives/templates/showWord.html',
            restrict: 'E',
            scope: {word: '='},
            controller: showWordDirectiveController,
            controllerAs: 'vm'
        };
    }
})();