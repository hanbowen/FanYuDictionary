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
    WordService.$inject = ['$http','toastr'];
    function WordService($http,toastr) {
        var wordService = {
            getWordDetail: getWordDetail,
            getNewWords: getNewWords,
            createNewWord: createNewWord,
            searchWord: searchWord,
            updateWord: updateWord,
            getMyWords: getMyWords
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
        function updateWord(word){
            return $http.put(wordURL+'/'+word.id,word)
                .then(updateWordComplete)
                .catch(updateWordFailed);

            function updateWordComplete(response) {
                return response.data;
            }

            function updateWordFailed(error) {
                console.error('XHR Failed for updateWordFailed.' + error.data);
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
                toastr.error("您没有权限进行此操作，请重新登录或联系管理员");
            }
        }

        function getMyWords(period, periodCount){
            return $http.get(wordURL+"?period="+period+"&periodCount="+periodCount)
                .then(getMyWordsComplete)
                .catch(getMyWordsFailed);

            function getMyWordsComplete(response) {
                return response.data;
            }

            function getMyWordsFailed(error) {
                console.error('XHR Failed for getMyWordsFailed.' + error.data);
                toastr.error("您没有权限进行此操作，请重新登录或联系管理员");
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