'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mean-stack:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appName: 'test',
        appDescription: 'test',
        pkgVersion: '0.0.0',
        appAuthor: 'test',
        appRepo: 'https://github.com/user/test.git',
        nodemailer: true,
        frontendGoodies: ['sass','ngResource','ngCookies','ngSanitize','lodash','uiRouter']
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      
    ]);
  });


});
