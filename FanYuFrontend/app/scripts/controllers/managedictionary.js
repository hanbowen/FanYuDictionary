'use strict';

/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:ManagedictionaryCtrl
 * @description
 * # ManagedictionaryCtrl
 * Controller of the fanYuFrontendApp
 */

(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('ManagedictionaryCtrl', function ($scope, DictionaryService) {
            var vm = this;
            vm.dictionaryList
            vm.dictionaryList = {};

            getDictionaryList();

            function getDictionaryList() {
                DictionaryService.getDictionaryList().then(function (data) {
                    vm.dictionaryList = data;
                });
            }

        });
})();
