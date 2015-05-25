'use strict';

describe('Directive: fanHeader', function () {

  // load the directive's module
  beforeEach(module('fanYuFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fan-header></fan-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fanHeader directive');
  }));
});
