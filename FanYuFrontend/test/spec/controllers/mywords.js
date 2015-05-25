'use strict';

describe('Controller: MywordsCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var MywordsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MywordsCtrl = $controller('MywordsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
