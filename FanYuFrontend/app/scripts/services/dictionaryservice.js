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

  DictionaryService.$inject = ['$http','$rootScope'];

  function DictionaryService($http,$rootScope) {
    //var dictionaryList = {};
    var service = {
        getDictionaryList: getDictionaryList,
        createDictionary: createDictionary,
        updateDictionary: updateDictionary,
        deleteDictionary: deleteDictionary
    };
    return service;

    function getDictionaryList() {
      return $http.get(dictURL).then(function(response){
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
                newItem.dictionaries.push(response[j]);
              }
            }
            newResponse.push(newItem);
          }
        console.log(newResponse);
          $rootScope.dictionaryList = newResponse;
          for(var i in $rootScope.dictionaryList){
              //利用反射机制，将四个字典拆分成四个list放在rootScope中。分别是fan_dictionaryList,ba__dictionaryList,zang_dictionaryList,han_dictionaryList;
              eval('$rootScope.'+$rootScope.dictionaryList[i].dicGroup+'_dictionaryList= $rootScope.dictionaryList[i].dictionaries');
          }
      });
    }

    function createDictionary(dictionary){
      return $http.post(dictURL, dictionary)
        .then(createDictionaryComplete)
        .catch(createDictionaryFailed);
      function createDictionaryComplete(response){
        return response.data;
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
      }
      function deleteDictionaryFailed(error){
        console.error('XHR Failed for deleteDictionaryFailed.' + error.data);
      }
    }



  };
})();
