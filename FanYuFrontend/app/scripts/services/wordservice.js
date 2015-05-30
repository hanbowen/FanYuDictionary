/**
 * @ngdoc service
 * @name fanYuFrontendApp.wordService
 * @description
 * # wordService
 * Factory in the fanYuFrontendApp.
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .factory('WordService', WordService);
    WordService.$inject = ["$http"];
    function WordService($http) {
        var wordService = {
            getWordDetail: getWordDetail,
            getNewWords: getNewWords,
            createNewWord: createNewWord,
            searchWord: searchWord
        };
        // Public API here
        return wordService;

        function getWordDetail(word){
            return $http.get(wordURL+'/'+word)
                .then(getWordDetailComplete)
                .catch(getWordDetailFailed);

            function getWordDetailComplete(response) {
                return response.data;
            }

            function getWordDetailFailed(error) {
                console.error('XHR Failed for getWordDetailFailed.' + error.data);
            }
        }

        function createNewWord(word){
            return $http.post(wordURL,word)
                .then(createNewWordComplete)
                .catch(createNewWordFailed);

            function createNewWordComplete(response) {
                return response.data;
            }

            function createNewWordFailed(error) {
                console.error('XHR Failed for createNewWordFailed.' + error.data);
            }
        }

        function getNewWords(period, periodCount){
            return $http.get(wordURL+"?period="+period+"&periodCount="+periodCount)
                .then(getNewWordsComplete)
                .catch(getNewWordsFailed);

            function getNewWordsComplete(response) {
                return response.data;
            }

            function getNewWordsFailed(error) {
                console.error('XHR Failed for getNewWordsFailed.' + error.data);
            }
        }

        function searchWord(search){
           // search={wordName}&match=prefix/mid/suffix&domain=duiyingci/bianxing/liju/quanwen
            return $http.get(wordURL+"?search="+search.searchWord+"&match="+search.match+"&domain="+search.domain)
                .then(searchWordComplete)
                .catch(searchWordFailed);

            function searchWordComplete(response) {
                return response.data;
            }

            function searchWordFailed(error) {
                console.error('XHR Failed for searchWordFailed.' + error.data);
            }
        }


    }
})();