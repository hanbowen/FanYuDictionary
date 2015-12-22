'use strict';

/**
 * @ngdoc service
 * @name fanYuFrontendApp.DictionaryService
 * @description
 * # DictionaryService
 * Factory in the fanYuFrontendApp.
 */
(function () {
  'use strict'
  angular.module('fanYuFrontendApp')
      .factory('DictionaryService', DictionaryService);

  DictionaryService.$inject = ['$http','$rootScope', 'toastr'];

  function DictionaryService($http,$rootScope,toastr) {
    //var dictionaryList = {};
    var service = {
        getDictionaryList: getDictionaryList,
        createDictionary: createDictionary,
        updateDictionary: updateDictionary,
        deleteDictionary: deleteDictionary,
        deleteWordsFromDictionary: deleteWordsFromDictionary
    };
    return service;

    function getDictionaryList(flag) {
    	return $http.get(dictURL + '?logon=' + flag).then(function(response){
          response = response.data;
          var dicGroups = [{name:'梵',id:1},{name:'巴',id:2},{name:'藏',id:3},{name:'汉',id:4}];
          var newResponse = [];
          for (var i in dicGroups){
            var newItem = {};
            newItem.dicGroup = dicGroups[i].name;
            newItem.dicGroupId = dicGroups[i].id;
            newItem.dictionaries = [];
            for (var j in response){
              if (response[j].dicGroup === newItem.dicGroup) {
                  if ($rootScope.currentUser != undefined && $rootScope.currentUser.dicSequence != undefined) {
                      //response[j].dicSequence = $rootScope.currentUser.dicSequence.sequence[response[j].id];
                  }
                newItem.dictionaries.push(response[j]);
              }
            }
            newResponse.push(newItem);
          }

          $rootScope.dictionaryList = newResponse;
          for(var i in $rootScope.dictionaryList){
              //利用反射机制，将四个字典拆分成四个list放在rootScope中。分别是fan_dictionaryList,ba__dictionaryList,zang_dictionaryList,han_dictionaryList;
              var dicGroup = '';
              switch ($rootScope.dictionaryList[i].dicGroup) {
                  case '梵': dicGroup = 'fan'; break;
                  case '巴': dicGroup = 'ba'; break;
                  case '藏': dicGroup = 'zang'; break;
                  case '汉': dicGroup = 'han'; break;
              }
              eval('$rootScope.'+dicGroup+'_dictionaryList= $rootScope.dictionaryList[i].dictionaries');
          }
      });
    }

    function createDictionary(dictionary){
      return $http.post(dictURL, dictionary)
        .then(createDictionaryComplete)
        .catch(createDictionaryFailed);
      function createDictionaryComplete(response){
        return response.data;
        toastr.success('词典创建成功')
      }
      function createDictionaryFailed(error){
        console.error('XHR Failed for createDictionaryFailed.' + error.data);
      }
    }

    function updateDictionary(dictionary){
      return $http.put(dictURL + '/' + dictionary.id, dictionary)
        .then(updateDictionaryComplete)
        .catch(updateDictionaryFailed);
      function updateDictionaryComplete(response){
        toastr.success('词典更新成功')
        return response.data;
      }
      function updateDictionaryFailed(error){
        console.error('XHR Failed for updateDictionaryFailed.' + error.data);
      }
    }

    function deleteDictionary(dictionaryId){
      return $http.delete(dictURL + '/' + dictionaryId)
        .then(deleteDictionaryComplete)
        .catch(deleteDictionaryFailed);
      function deleteDictionaryComplete(response){
        return response.data;
        toastr.success('词典删除成功')
      }
      function deleteDictionaryFailed(error){
        console.error('XHR Failed for deleteDictionaryFailed.' + error.data);
      }
    }

    function deleteWordsFromDictionary(dictionaryId){
      return $http.delete(dictURL + '/delwords/' + dictionaryId)
        .then(deleteWordsFromDictionaryComplete)
        .catch(deleteWordsFromDictionaryFailed);
      function deleteWordsFromDictionaryComplete(response){
        return response.data;
        toastr.success('词条清除成功')
      }
      function deleteWordsFromDictionaryFailed(error){
        console.error('XHR Failed for deleteWordsFromDictionaryFailed.' + error.data);
      }
    }

  };
})();
