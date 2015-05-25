/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:login
 * @description
 * # login
 */
(function () {
    'use strict';
    angular.module('fanYuFrontendApp')
        .directive('login', login);

    function login() {
        var loginController = ['$scope','AuthenticationService', function ($scope,AuthenticationService) {
                $scope.username = "";
                $scope.password = "";
                $scope.login = login;
                function login(){
                    console.log( $scope.username+" " + $scope.password);
                    AuthenticationService.login($scope.username,$scope.password).then(function(data){
                        console.log(data);
                    });
                }
            }];

            return {
            templateUrl: 'scripts/directives/templates/login.html',
            restrict: 'E',
            controller: loginController
        };
    }
})();