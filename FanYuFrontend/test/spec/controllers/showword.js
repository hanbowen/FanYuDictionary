'use strict';

describe('Controller: ShowwordCtrl', function () {

  // load the controller's module
  beforeEach(module('fanYuFrontendApp'));

  var ShowwordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowwordCtrl = $controller('ShowwordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
