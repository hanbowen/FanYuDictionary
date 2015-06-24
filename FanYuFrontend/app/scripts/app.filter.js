/**
 * @ngdoc overview
 * @name fanYuFrontendApp
 * @description
 * # fanYuFrontendApp
 *
 * Main module of the application.
 */
(function () {
    'use strict';
    angular
        .module('fanYuFrontendApp')
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total, 10);
                for (var i = 1; i <= total; ++i) {
                    input.push(i);
                }
                return input;
            };
        })
        //转化model中的富文本为可显示的html；
        .filter('unsafe', function ($sce) {
            return $sce.trustAsHtml;
        })
        .filter('translateStatus',function(){
            return function(input){
                var output = input;
                switch (input) {
                    case 'updated': output = "已更新"; break;
                    case 'checked': output = '已收录';break;
                    case 'published': output = '已发布'; break;
                    case 'created': output = '新词条'; break;
                    default: break;
                }
                return output;
            }
        });
})();