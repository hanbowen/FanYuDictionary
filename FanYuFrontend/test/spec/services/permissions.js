'use strict';

describe('Service: permissions', function () {

  // load the service's module
  beforeEach(module('fanYuFrontendApp'));

  // instantiate service
  var permissions;
  beforeEach(inject(function (_permissions_) {
    permissions = _permissions_;
  }));

  it('should do something', function () {
    expect(!!permissions).toBe(true);
  });

});
