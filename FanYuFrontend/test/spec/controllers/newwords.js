'use strict';

describe('Controller: NewwordsCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var NewwordsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewwordsCtrl = $controller('NewwordsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
