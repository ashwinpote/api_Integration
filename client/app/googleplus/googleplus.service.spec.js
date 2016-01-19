'use strict';

describe('Service: googleplus', function () {

  // load the service's module
  beforeEach(module('apiIntegrationApp'));

  // instantiate service
  var googleplus;
  beforeEach(inject(function (_googleplus_) {
    googleplus = _googleplus_;
  }));

  it('should do something', function () {
    expect(!!googleplus).toBe(true);
  });

});
