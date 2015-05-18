/**
 * @ngdoc function
 * @name fanYuFrontendApp.controller:CreatewordCtrl
 * @description
 * # CreatewordCtrl
 * Controller of the fanYuFrontendApp
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .controller('CreatewordCtrl', function ($scope) {
            var vm = this;
            vm.word = {};
            vm.freeDescription = "init text";
            tinymce.init({
                plugins: "textcolor,link,table",
                menubar : false,
                language : 'zh_CN',
                height: 300,
                statusbar : false,
                selector: '#freestyleInput',
                theme: "modern",
                skin: 'light',
                toolbar: [
                    "undo redo | link unlink | bold italic forecolor backcolor | table | image | alignleft aligncenter alignright"
                ]
            });
        });
})();
