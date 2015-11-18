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
      vm.dictionary.shortName = '';
      vm.dictionary.dicGroup = '';
      vm.dictionary.author = $rootScope.currentUser;

      vm.dictionaryId = '';
      vm.addDict = addDict;

      vm.deleteConfirm = deleteConfirm;
      vm.createDictionary = createDictionary;
      vm.editDictionary = editDictionary;
      vm.deleteDictionary = deleteDictionary;
      vm.updateDictionary = updateDictionary;

      vm.deleteWordsFromDicts = deleteWordsFromDicts;
      vm.deleteWordsFromDictsConfirm = deleteWordsFromDictsConfirm;

      getDictionaryList();

      function getDictionaryList() {
        DictionaryService.getDictionaryList().then(function(data) {
          vm.dictionaryList = data;
        });
      }

      function createDictionary() {
        if (vm.dictionary.displayName == null || vm.dictionary.displayName == '') {
          alert('词典名不能为空');
        } else if (vm.dictionary.shortName == null || vm.dictionary.shortName == '') {
          alert('词典简称不能为空');
        } else {
          DictionaryService.createDictionary(vm.dictionary).then(function(data) {
            if (data == 'error-displayName') {
              alert('该词典名已经存在，请输入新词典名');
            } else if (data == 'error-shortName') {
              alert('词典简称已经存在，请重新输入')
            } else {
               DictionaryService.createDictionary(vm.dictionary).then(function(data) {
                console.log(data);
                $('#dictionaryModal').modal('hide');
                getDictionaryList();
              });
            }
          });
        }
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
          } else if (data === 'error') {
            alert('梵汉词汇表不允许删除');
            $('#deleteConfirmModal').modal('hide');
          }
          getDictionaryList();
        });
      }

      function deleteConfirm(dictionaryId) {
        vm.dictionaryId = dictionaryId;
      }

      function deleteWordsFromDicts() {
        DictionaryService.deleteWordsFromDictionary(vm.dictionaryId).then(function(data) {
          if (data === 'success') {
            $('#deleteWordsFromDictsModal').modal('hide');
          } else if (data === 'error') {
            alert('梵汉词汇表词条不允许清除');
            $('#deleteWordsFromDictsModal').modal('hide');
          }
          getDictionaryList();
        });
      }

      function deleteWordsFromDictsConfirm(dictionaryId) {
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
