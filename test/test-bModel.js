'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mean-stack:bModel', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../bModel'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withPrompt({
        modelName: 'test',
        fieldName: 'fieldTest',
        fieldType: 'type',
        fieldDefault: 'test',
        fieldReq: true,
        fieldRef: '',
        fieldUnique: true,
        askAgain: false
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/backend/models/test.js'
    ]);
  });


});
