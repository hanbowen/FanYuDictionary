'use strict';

describe('Service: DictionaryService', function () {

  // load the service's module
  beforeEach(module('fanYuFrontendApp'));

  // instantiate service
  var DictionaryService;
  beforeEach(inject(function (_DictionaryService_) {
    DictionaryService = _DictionaryService_;
  }));

  it('should do something', function () {
    expect(!!DictionaryService).toBe(true);
  });

});
