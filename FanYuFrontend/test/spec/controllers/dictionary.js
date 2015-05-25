'use strict';

describe('Controller: DictionaryCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var DictionaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DictionaryCtrl = $controller('DictionaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
