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
        
        oauth: ['Facebook'],
        nodemailer: true,
        sass: true,
        bootstrap: true,
        bootstrapSass: true,
        fontAwesome: true,
        frontendGoodies: ['ngAnimate','ngRoute','ngResource','ngCookies','ngSanitize','ngTouch','lodash','uiRouter']
      })
      .on('end', done);
  });

  it('should create main project files', function () {
    assert.file([
      '.travis.yml',
      'Gruntfile.js',
      'README.md',
      'bower.json',
      'karma.conf.js',
      'package.json',
      '.editorconfig',
      '.gitignore',
      '.jshintrc'
    ]);

  });

  it('should create backend files', function () {
  	assert.file([
  	  'app/config.json',
      'app/backend/app.js',
      'app/backend/lib/database.js',
      'app/backend/lib/strategies/facebook.js',
      'app/backend/lib/strategies/local.js',
      'app/backend/models/user.js',
      'app/backend/models/remember.js',
      'app/backend/models/task.js',
      'app/backend/router/auth/oauth.js',
      'app/backend/router/auth/email.js',
      'app/backend/router/auth/local.js',
      'app/backend/router/index.js',
      'app/backend/router/routes/task.js',
      'app/backend/templates/confirm-mail.js',
      'app/backend/templates/theft-mail.js',
      'app/server.js'
  	]);
  });

  it('should create frontend files', function () {
  	assert.file([
  		'app/frontend/index.html',
  		'app/frontend/css/_variables.scss',
  		'app/frontend/css/partials/_admin.scss',
  		'app/frontend/css/partials/_main.scss',
  		'app/frontend/css/styles.scss',
  		'app/frontend/img/facebook.png',
  		'app/frontend/img/github.png',
  		'app/frontend/img/google.png',
  		'app/frontend/img/linkedin.png',
  		'app/frontend/img/meanstack.svg',
  		'app/frontend/img/twitter.png',
  		'app/frontend/img/yeoman.png',
  		'app/frontend/js/app.js',
  		'app/frontend/js/controllers/404.js',
  		'app/frontend/js/controllers/admin.js',
  		'app/frontend/js/controllers/auth.js',
  		'app/frontend/js/controllers/main.js',
  		'app/frontend/js/services/InterceptorService.js',
  		'app/frontend/robots.txt',
  		'app/frontend/views/footer.html',
  		'app/frontend/views/header.html',
  		'app/frontend/views/404.html',
  		'app/frontend/views/admin.html',
  		'app/frontend/views/mail.html',
  		'app/frontend/views/main.html',
  		'app/frontend/favicon.ico'
  	]);
  });


});
