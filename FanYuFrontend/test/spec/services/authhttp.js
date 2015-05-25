'use strict';

describe('Service: AuthHttp', function () {

  // load the service's module
  beforeEach(module('fanYuFrontendApp'));

  // instantiate service
  var AuthHttp;
  beforeEach(inject(function (_AuthHttp_) {
    AuthHttp = _AuthHttp_;
  }));

  it('should do something', function () {
    expect(!!AuthHttp).toBe(true);
  });

});
