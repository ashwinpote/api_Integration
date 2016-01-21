'use strict';

describe('Service: youtubeService', function () {

  // load the service's module
  beforeEach(module('apiIntegrationApp'));

  // instantiate service
  var youtubeService;
  beforeEach(inject(function (_youtubeService_) {
    youtubeService = _youtubeService_;
  }));

  it('should do something', function () {
    expect(!!youtubeService).toBe(true);
  });


});
