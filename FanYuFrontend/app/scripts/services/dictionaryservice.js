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
                getDictionaryList: getDictionaryList
            };
            return service;

            function getDictionaryList() {
                return $http.get("json/dictionarylist.json").then(function(response){
                    $rootScope.dictionaryList = response.data;
                    for(var i in $rootScope.dictionaryList){
                        //利用反射机制，将四个字典拆分成四个list放在rootScope中。分别是fan_dictionaryList,ba__dictionaryList,zang_dictionaryList,han_dictionaryList;
                        eval('$rootScope.'+$rootScope.dictionaryList[i].dicGroup+'_dictionaryList= $rootScope.dictionaryList[i].dictionaries');
                    }


                });
            }
    };
})();
