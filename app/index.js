'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var leaveFile = function (fileArray, file) {
	var gFile = fileArray.indexOf(file);
	while (gFile !== -1) {
		fileArray.splice(gFile, 1);
		gFile = fileArray.indexOf(file);
	}
}
	
module.exports = yeoman.generators.Base.extend({


  initializing: function () {
    this.pkg = require('../package.json');
    this.argument('name', { type: String, required: false });
    this.appname = this.name ||this.appname;
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.filters = {};

    this.log(chalk.yellow.bold('\nWelcome to Mean-Stack generator !\nLet me ask you some questions...\n'));

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
          message: 'Do you want to use nodemailer ? (To send emails to new users, etc...)',
          default: true
        }], function (answers) {

          this.filters.mail = answers.nodemailer;
  	      if(answers.oauth) {
      			if(answers.oauth.length) this.filters.oauth = true;
      		    answers.oauth.forEach(function(oauthStrategy) {
      			  this.filters[oauthStrategy] = true;
      		    }.bind(this));
      		  }

            done();

          }.bind(this));


      },

      
      frontendPrompt: function () {


        var done = this.async();


        this.prompt([{
          type: 'confirm',
          name: 'sass',
          message: 'Would you like to use Sass (with Compass) ?',
          default: true
        },{
          type: 'confirm',
          name: 'bootstrap',
          message: 'Would you like to use Bootstrap ?',
          default: true
        },{
          type: 'confirm',
          name: 'bootstrapSass',
          message: 'Would you like to use Sass version of Bootstrap ?',
          default: true
        },{
          type: 'confirm',
          name: 'fontAwesome',
          message: 'Would you like to use Font Awesome ?'
        },{
          type: 'checkbox',
          name: 'frontendGoodies',
          message: 'What frontend modules do you want ?',
          choices: [{
            value: 'ngAnimate',
            name: 'angular-ng-animate',
            checked: true
          }, {
            value: 'ngCookies',
            name: 'angular-ng-cookies',
            checked: true
          }, {
            value: 'ngResource',
            name: 'angular-ng-resource',
            checked: true
          }, {
            value: 'ngRoute',
            name: 'angular-ng-route',
            checked: true
          }, {
            value: 'ngSanitize',
            name: 'angular-ng-sanitize',
            checked: true
          }, {
            value: 'ngTouch',
            name: 'angular-ng-touch',
            checked: true
          }, {
            value: 'uiRouter',
            name: 'angular-ui-router',
            checked: true
          }, {
            value: 'lodash',
            name: 'lodash',
            checked: true
          }]
        }], function (answers) {
            this.filters.sass = answers.sass;
            this.filters.bootstrap = answers.bootstrap;
            this.filters.bootstrapSass = answers.bootstrapSass;
            this.filters.fontAwesome = answers.fontAwesome;
            if(answers.frontendGoodies) {
  		        if(answers.frontendGoodies.length) this.filters.goodies = true;
  		        answers.frontendGoodies.forEach(function(goodie) {
  		          this.filters[goodie] = true;
  		        }.bind(this));
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

      if(this.filters.sass) {
      	leaveFile(files, '_app/_frontend/_css/_styles.css');
      } else {
      	leaveFile(files, '_app/_frontend/_css/_styles.scss');
      	leaveFile(files, '_app/_frontend/_css/_--variables.scss');
      	leaveFile(files, '_app/_frontend/_css/_partials/_--main.scss');
      	leaveFile(files, '_app/_frontend/_css/_partials/_--admin.scss');
      }

      if(!this.filters.mail) {
      	leaveFile(files, '_app/_backend/_templates/_confirm-mail.js');
      	leaveFile(files, '_app/_backend/_templates/_theft-mail.js');
        leaveFile(files, '_app/_backend/_router/_auth/_email.js');
        leaveFile(files, '_app/_frontend/_views/_mail.html');
      }

      if(!this.filters.Facebook) {
        leaveFile(files, '_app/_backend/_lib/_strategies/!_facebook.js');
      }

      if(!this.filters.Twitter) {
        leaveFile(files, '_app/_backend/_lib/_strategies/!_twitter.js');
      }

      if(!this.filters.Github) {
        leaveFile(files, '_app/_backend/_lib/_strategies/!_github.js');
      }

      if(!this.filters.Google) {
        leaveFile(files, '_app/_backend/_lib/_strategies/!_google.js');
      }

      if(!this.filters.LinkedIn) {
        leaveFile(files, '_app/_backend/_lib/_strategies/!_linkedin.js');
      }

      if(!this.filters.oauth) {
        leaveFile(files, '_app/_backend/_router/_auth/!_oauth.js');
      }


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
              filters: self.filters,
              dirs: { 
              	app: '<%= dirs.app %>',
              	build: '<%= dirs.build %>'
              }
          });
          self.log('\''+dest+'\',');

        }
        else {

          dest = self.destinationPath(filteredPath);

          self.copy(src, dest);
          self.log('\''+dest+'\',');
        }
 
      });
    },

    emptyDir: function () {

    	if (!this.filters.sass) {
    		this.fs.delete(this.destinationPath('app/frontend/css/partials'));
    	}

    	if (!this.filters.mail) {
    		this.fs.delete(this.destinationPath('app/backend/templates'));
    	}

    }


  },


  install: function () {

    this.installDependencies({
      skipInstall: this.options['skip-install']
    });

  },


  end: function () {

  	this.log(chalk.green.bold('\n\nInstallation done. \nDon\'t forget to configure your app (edit /app/config.json)'));
  }


});
