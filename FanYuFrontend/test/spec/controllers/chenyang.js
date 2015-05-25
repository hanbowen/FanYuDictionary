'use strict';

describe('Controller: ChenyangCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var ChenyangCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChenyangCtrl = $controller('ChenyangCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
