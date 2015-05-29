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
            getNewWords: getNewWords
        };
        // Public API here
        return wordService;

        function getWordDetail(){
            return $http.get('json/word.json')
                .then(getWordDetailComplete)
                .catch(getWordDetailFailed);

            function getWordDetailComplete(response) {
                return response.data;
            }

            function getWordDetailFailed(error) {
                console.error('XHR Failed for getWordDetailFailed.' + error.data);
            }
        }

        function getNewWords(peroid){
            return $http.get('json/newword.json')
                .then(getNewWordsComplete)
                .catch(getNewWordsFailed);

            function getNewWordsComplete(response) {
                return response.data;
            }

            function getNewWordsFailed(error) {
                console.error('XHR Failed for getNewWordsFailed.' + error.data);
            }
        }

    }
})();