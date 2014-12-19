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
        appRepo: 'https://github.com/user/test.git'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Gruntfile.js',
      'bower.json',
      'package.json',
      '.jshintrc',
      '.gitignore',
      'app/server.js',
      'app/config.json',
      'app/backend/app.js',
      'app/backend/lib/database.js',
      'app/backend/lib/strategies.js',
      'app/backend/models/task.js',
      'app/backend/models/user.js',
      'app/backend/models/remember.js',
      'app/backend/router/index.js',
      'app/backend/router/routes/task.js',
      'app/backend/templates/confirm-mail.js',
      'app/backend/templates/theft-mail.js',
      'app/frontend/index.html',
      'app/frontend/robots.txt',
      'app/frontend/favicon.ico',
      'app/frontend/css/styles.scss',
      'app/frontend/css/_variables.scss',
      'app/frontend/css/partials/_main.scss',
      'app/frontend/css/partials/_admin.scss',
      'app/frontend/img/meanstack.svg',
      'app/frontend/img/yeoman.png',
      'app/frontend/js/app.js',
      'app/frontend/js/controllers/admin.js',
      'app/frontend/js/controllers/404.js',
      'app/frontend/js/controllers/main.js',
      'app/frontend/js/controllers/auth.js',
      'app/frontend/js/services/interceptors.js',
      'app/frontend/js/services/auth.js',
      'app/frontend/views/main.html',
      'app/frontend/views/404.html',
      'app/frontend/views/admin.html',
      'app/frontend/views/header.html',
      'app/frontend/views/footer.html'
    ]);
  });


});
