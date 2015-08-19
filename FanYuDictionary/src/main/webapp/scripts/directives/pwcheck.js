'use strict';

/**
 * @ngdoc directive
 * @name fanYuFrontendApp.directive:pwCheck
 * @description
 * # pwCheck
 */
angular.module('fanYuFrontendApp')
  .directive('pwCheck', function () {
/*    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the pwCheck directive');
      }
    };*/
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }

  });
