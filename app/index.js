'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({


  initializing: function () {
    this.pkg = require('../package.json');
    this.argument('name', { type: String, required: false });
    this.appname = this.name ||this.appname;
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.filters = {};

  },


  info: function () {
    this.log('\n\n\n\n\n');
    this.log('Thank you for using generator-meanstack. This node package will help you to generate');
    this.log('a full MEAN (MongoDB, ExpressJS, AngularJS, NodeJS) stack application, ready to use.');
  },


  prompting: {

      appPrompt: function () {


        var done = this.async();

        var prompts = [];


        if(!this.name) {

          prompts.push({
            type: 'input',
            name: 'appName',
            message: 'What is the name of your application ?',
            default: this.appname
          });

        }

    
        prompts.push({
          type: 'input',
          name: 'appDescription',
          message: 'A little description ?'
        },
        {
          type: 'input',
          name: 'pkgVersion',
          message: 'What is the version of your appllication ?',
          default: '0.0.0'
        },
        {
          type: 'input',
          name: 'appAuthor',
          message: 'And, who are you ?',
          default: 'Simon Baker <simon.baker@hostname.com>'
        },
        {
          type: 'input',
          name: 'appRepo',
          message: 'The application repository ?',
          default: 'https://github.com/user/'+this.appname+'.git'
        });


        this.prompt(prompts, function (answers) {
          this.appName = answers.appName || this.name;
          this.pkgVersion = answers.pkgVersion;
          this.appAuthor = answers.appAuthor;
          this.appRepo = answers.appRepo;
          this.appDescription = answers.appDescription;

          done();
        }.bind(this));


      },


      backendPrompt: function () {


        var done = this.async();


        this.prompt([{
          type: 'checkbox',
          name: 'oauth',
          message: 'Mongoose provides a local strategy by default. Please choose others needed strategies :',
          choices: ['Google','Facebook','Twitter','LinkedIn', 'Github']
        },{
          type: 'confirm',
          name: 'nodemailer',
          message: 'Do you want to set up nodemailer ? (To send registration confirmation emails to new user, etc...)',
          default: true
        }], function (answers) {

          this.filters.mail = answers.nodemailer;
          if (answers.oauth.length > 0) {
            this.filters.oauth= true;
            answers.oauth.forEach(function (o) {
              this.filters[o] = true;
            });           
          }
          done();

        }.bind(this));


      },

      
      frontendPrompt: function () {


        var done = this.async();


        this.prompt([{
          type: 'checkbox',
          name: 'frontendGoodies',
          message: 'The generator will set up some standard components (jQuery, Bootstrap, ngRoute, Font Awesome, ...)\n'+
                   'Choose your extra components for the frontend :',
          choices: [{
            name: 'sass',
            value: 'SASS / Compass support'
          }, {
            name: 'ngResource',
            value: 'Angular Resource'
          }, {
            name: 'ngCookies',
            value: 'Angular Cookies'
          }, {
            name: 'ngSanitize',
            value: 'Angular Sanitize'
          }, {
            name: 'lodash',
            value: 'lodash'
          }, {
            name: 'uiRouter',
            value: 'Angular UI Router'
          }, {
            name: 'hammer',
            value: 'angular-hammer'
          }, {
            name: 'mdi',
            value: 'Material Design Icons'
          }]
        }], function (answers) {
            if(answers.length > 0) {
              this.filters.goodies = true;
              answers.frontendGoodies.forEach(function (c) {
                this.filters[c] = true;
              });
            }


          done();

        }.bind(this));


      }
      
        
  },

  writing: {


    generateProject: function () {

      var self = this;
      var files = this.expandFiles('**',{dot: true, cwd: this.sourceRoot()});
      var src, dest, filteredPath;

      files.forEach(function (f) {
        
        src = self.templatePath(f);
        filteredPath = f.replace(/_/g, '');
        filteredPath = filteredPath.replace(/--/g, '_');

        if (filteredPath.indexOf('!') > -1) {

          filteredPath = filteredPath.replace('!', '');
          dest = self.destinationPath(filteredPath);          

          
          self.fs.copyTpl(src, dest, {
              appName: self.appName,
              pkgVersion: self.pkgVersion,
              appAuthor: self.appAuthor,
              appRepo: self.appRepo,
              appDescription: self.appDescription,
              filters: self.filters
          });
          

        }
        else {

          dest = self.destinationPath(filteredPath);

          self.copy(src, dest);

        }
 
      });
    }


  },


  install: function () {

    this.installDependencies({
      skipInstall: this.options['skip-install']
    });

  },


  end: function () {

  	this.log(
  		'Installation done. \nDon\'t forget to configure your app (edit '+
  		chalk.green.bold('/app/config.json')+')'
  	);

  }


});
