'use strict';

describe('Service: wordService', function () {

  // load the service's module
  beforeEach(module('fanYuFrontendApp'));

  // instantiate service
  var wordService;
  beforeEach(inject(function (_wordService_) {
    wordService = _wordService_;
  }));

  it('should do something', function () {
    expect(!!wordService).toBe(true);
  });

});
