'use strict';

describe('Directive: hasPermission', function () {

  // load the directive's module
  beforeEach(module('fanYuFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<has-permission></has-permission>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hasPermission directive');
  }));
});
