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
        })
        .filter('mapCode', function() {
          return function(input){
            var output = input;
            switch (input) {
              case 'mohu': output = "模糊"; break;
              default: break;
            }
            return output;
          }
        })
        .filter('mapMatch', function() {
          return function(input){
            var output = input;
            switch (input) {
              case 'shou': output = "首"; break;
              case 'wei': output = "尾"; break;
              case 'zhong': output = "中"; break;
              case 'jingque': output = "精确"; break;
              default: break;
            }
            return output;
          }
        })
        .filter('mapDomain', function() {
          return function(input){
            var output = input;
            switch (input) {
              case 'danci': output = "单词"; break;
              case 'duiyingci': output = "对应词"; break;
              case 'bianxing': output = "变形"; break;
              case 'liju': output = "例句"; break;
              case 'quanwen': output = "全文"; break;
              default: break;
            }
            return output;
          }
        });
})();
