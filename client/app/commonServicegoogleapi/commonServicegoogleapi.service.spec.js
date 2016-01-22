'use strict';

describe('Service: commonServicegoogleapi', function () {

  // load the service's module
  beforeEach(module('apiIntegrationApp'));

  // instantiate service
  var commonServicegoogleapi;
  beforeEach(inject(function (_commonServicegoogleapi_) {
    commonServicegoogleapi = _commonServicegoogleapi_;
  }));

  it('should do something', function () {
    expect(!!commonServicegoogleapi).toBe(true);
  });

});
