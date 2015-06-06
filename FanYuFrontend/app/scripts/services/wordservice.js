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
    WordService.$inject = ['$http', 'toastr'];
    function WordService($http, toastr) {
        var wordService = {
            getWordDetail: getWordDetail,
            getNewWords: getNewWords,
            createNewWord: createNewWord,
            searchWord: searchWord,
            updateWord: updateWord,
            getMyWords: getMyWords,
            publishWord: publishWord,
            deleteWord: deleteWord
        };
        // Public API here
        return wordService;

        function getWordDetail(word) {
            return $http.get(wordURL + '/' + word)
                .then(getWordDetailComplete)
                .catch(getWordDetailFailed);

            function getWordDetailComplete(response) {
                return response.data;
            }

            function getWordDetailFailed(error) {
                console.error('XHR Failed for getWordDetailFailed.' + error.data);
            }
        }

        function createNewWord(word) {
            return $http.post(wordURL, word)
                .then(createNewWordComplete)
                .catch(createNewWordFailed);

            function createNewWordComplete(response) {
                toastr.success('词条创建成功');
                return response.data;
            }

            function createNewWordFailed(error) {
                console.error('XHR Failed for createNewWordFailed.' + error.data);
            }
        }

        function updateWord(word) {
            return $http.put(wordURL + '/' + word.id, word)
                .then(updateWordComplete)
                .catch(updateWordFailed);

            function updateWordComplete(response) {
                return response.data;
            }

            function updateWordFailed(error) {
                console.error('XHR Failed for updateWordFailed.' + error.data);
            }
        }

        function publishWord(wordId) {
            return $http.put(wordURL + '/' + wordId + '/publish')
                .then(publishWordComplete)
                .catch(publishWordFailed);

            function publishWordComplete(response) {
                return response.data;
            }

            function publishWordFailed(error) {
                console.error('XHR Failed for publishWordFailed.' + error.data);
            }
        }

        function deleteWord(wordId) {
            return $http.delete(wordURL + '/' + wordId)
                .then(deleteWordComplete)
                .catch(deleteWordFailed);

            function deleteWordComplete(response) {
                return response.data;
            }

            function deleteWordFailed(error) {
                console.error('XHR Failed for deleteWordFailed.' + error.data);
            }
        }

        function getNewWords(period, periodCount,page,pageSize) {
            return $http.get(wordURL + "?period=" + period + '&periodCount=' + periodCount + '&page='+page+'&pageSize='+pageSize)
                .then(getNewWordsComplete)
                .catch(getNewWordsFailed);

            function getNewWordsComplete(response) {
                return response;
            }

            function getNewWordsFailed(error) {
                console.error('XHR Failed for getNewWordsFailed.' + error.data);
                toastr.error("您没有权限进行此操作，请重新登录或联系管理员");
            }
        }

        function getMyWords(userId, page, pageSize) {
            return $http.get(wordURL + '?userId=' + userId + '&page='+page+'&pageSize='+pageSize)
                .then(getMyWordsComplete)
                .catch(getMyWordsFailed);

            function getMyWordsComplete(response) {
                return response;
            }

            function getMyWordsFailed(error) {
                console.error('XHR Failed for getMyWordsFailed.' + error.data);
                toastr.error("您没有权限进行此操作，请重新登录或联系管理员");
            }
        }


        function searchWord(search) {
            // search={wordName}&match=prefix/mid/suffix&domain=duiyingci/bianxing/liju/quanwen
            return $http.get(wordURL + "?search=" + search.searchWord + "&match=" + search.match + "&domain=" + search.domain)
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