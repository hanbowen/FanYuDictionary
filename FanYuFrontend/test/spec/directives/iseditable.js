'use strict';

describe('Directive: isEditable', function () {

  // load the directive's module
  beforeEach(module('fanYuFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<is-editable></is-editable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the isEditable directive');
  }));
});
