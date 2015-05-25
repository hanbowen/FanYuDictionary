'use strict';

describe('Controller: CreatewordCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var CreatewordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatewordCtrl = $controller('CreatewordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
