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
    .controller('ManagedictionaryCtrl', function ($scope, $rootScope, DictionaryService) {
      var vm = this;
      vm.dictionaryList = {};
      vm.isEdit = false;

      vm.dictionary = {};
      vm.dictionary.id = '';
      vm.dictionary.displayName = '';
      vm.dictionary.dicGroup = '';
      vm.dictionary.author = $rootScope.currentUser;

      vm.dictionaryId = '';
      vm.addDict = addDict;

      vm.deleteConfirm = deleteConfirm;
      vm.createDictionary = createDictionary;
      vm.editDictionary = editDictionary;
      vm.deleteDictionary = deleteDictionary;
      vm.updateDictionary = updateDictionary;

      getDictionaryList();

      function getDictionaryList() {
        DictionaryService.getDictionaryList().then(function(data) {
          vm.dictionaryList = data;
        });
      }

      function createDictionary() {
        DictionaryService.createDictionary(vm.dictionary).then(function(data) {
          console.log(data);
          $('#dictionaryModal').modal('hide');
          getDictionaryList();
        });
      }

      function editDictionary(dictionary) {
        vm.isEdit = true;
        vm.dictionary.id = dictionary.id;
        vm.dictionary.displayName = dictionary.displayName;
        vm.dictionary.dicGroup = dictionary.dicGroup;
      }

      function updateDictionary() {
        DictionaryService.updateDictionary(vm.dictionary).then(function(data) {
          console.log(data);
          $('#dictionaryModal').modal('hide');
          getDictionaryList();
        });
      }

      function deleteDictionary() {
        DictionaryService.deleteDictionary(vm.dictionaryId).then(function(data) {
          if (data === 'success') {
            $('#deleteConfirmModal').modal('hide');
          }
          getDictionaryList();
        });
      }

      function deleteConfirm(dictionaryId) {
        vm.dictionaryId = dictionaryId;
      }

      function addDict(dicGroup) {
        vm.isEdit = false;
        //vm.dictionary.displayName = '';
        vm.dictionary = {};
        vm.dictionary.dicGroup = dicGroup;
      }



    });
})();
