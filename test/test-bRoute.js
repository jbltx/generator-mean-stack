'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mean-stack:bRoute', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../bRoute'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-model': true })
      .withPrompt({
        routeName: 'test',
        isRestricted: true,
        isCrud: true
      })
      .on('end', done);
  });

  it('should create a new backend route', function () {
    assert.file([
      'app/backend/router/routes/test.js'
    ]);
  });


});
