'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

	this.log('\n\n\n\n\n');
	this.log('███╗   ███╗███████╗ █████╗ ███╗   ██╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗');
	this.log('████╗ ████║██╔════╝██╔══██╗████╗  ██║    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝');
	this.log('██╔████╔██║█████╗  ███████║██╔██╗ ██║    ███████╗   ██║   ███████║██║     █████╔╝ ');
	this.log('██║╚██╔╝██║██╔══╝  ██╔══██║██║╚██╗██║    ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ ');
	this.log('██║ ╚═╝ ██║███████╗██║  ██║██║ ╚████║    ███████║   ██║   ██║  ██║╚██████╗██║  ██╗');
	this.log('╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝');
	this.log('Thank you for using generator-meanstack. This node package will help you to generate');
	this.log('a full MEAN (MongoDB, ExpressJS, AngularJS, NodeJS) stack application, ready to use.');

    var prompts = [{
    	type: 'input',
    	name: 'appName',
    	message: 'What is the name of your application ?',
    	default: this.appname
    },
    {
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
    }];
    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.pkgVersion = props.pkgVersion;
      this.appAuthor = props.appAuthor;
      this.appRepo = props.appRepo;
      this.appDescription = props.appDescription;

      done();
    }.bind(this));
  },

  writing: {
  	scaffoldDirs: function () {
  		this.mkdir('build');
  		this.mkdir('app');
  		this.mkdir('app/backend');
  		this.mkdir('app/backend/models');
  		this.mkdir('app/backend/lib');
  		this.mkdir('app/backend/templates');
  		this.mkdir('app/backend/router');
  		this.mkdir('app/backend/router/routes');
  		this.mkdir('app/frontend');
  		this.mkdir('app/frontend/js');
  		this.mkdir('app/frontend/js/controllers');
  		this.mkdir('app/frontend/js/services');
  		this.mkdir('app/frontend/css');
  		this.mkdir('app/frontend/css/partials');
  		this.mkdir('app/frontend/img');
  		this.mkdir('app/frontend/fonts');
  		this.mkdir('app/frontend/views');
  	},
  	projectfiles: function () {
    	this.copy('_Gruntfile.js','Gruntfile.js');
      	this.fs.copyTpl(
      		this.templatePath('_package.json'),
      		this.destinationPath('package.json'), {
      			appName: this.appName,
      			pkgVersion: this.pkgVersion,
      			appAuthor: this.appAuthor,
      			appRepo: this.appRepo,
      			appDescription: this.appDescription
      	});
		this.fs.copyTpl(
			this.templatePath('_bower.json'),
			this.destinationPath('bower.json'), {
				appName: this.appName,
				pkgVersion: this.pkgVersion
		});
		this.copy('jshintrc','.jshintrc');
		this.copy('gitignore','.gitignore');
    },
    app: function () {
      	this.copy('_app/_server.js','app/server.js');
      	this.copy('_app/_config.json','app/config.json');
    },
    backend: function () {
    	this.copy('_app/_backend/_app.js','app/backend/app.js');
    	this.copy('_app/_backend/_lib/_database.js','app/backend/lib/database.js');
    	this.copy('_app/_backend/_lib/_strategies.js','app/backend/lib/strategies.js');
    	this.copy('_app/_backend/_models/_task.js','app/backend/models/task.js');
    	this.copy('_app/_backend/_models/_user.js','app/backend/models/user.js');
      this.copy('_app/_backend/_models/_remember.js','app/backend/models/remember.js');
    	this.copy('_app/_backend/_router/_index.js','app/backend/router/index.js');
      this.copy('_app/_backend/_router/_routes/_task.js','app/backend/router/routes/task.js');
      this.fs.copyTpl( 
        	this.templatePath('_app/_backend/_templates/_confirm-mail.js'),
        	this.destinationPath('app/backend/templates/confirm-mail.js'),{
        		appName: this.appName
        	}
      );
      this.fs.copyTpl(
        	this.templatePath('_app/_backend/_templates/_theft-mail.js'),
        	this.destinationPath('app/backend/templates/theft-mail.js'), {
        		appName: this.appName
        	}
      );
    },
    frontend: function () {
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_index.html'), 
    		this.destinationPath('app/frontend/index.html'), {
    			appName: this.appName,
    			appDescription: this.appDescription
    	});
    	this.copy('_app/_frontend/_robots.txt','app/frontend/robots.txt');
    	this.copy('_app/_frontend/favicon.ico','app/frontend/favicon.ico');
    	this.copy('_app/_frontend/_css/_styles.scss','app/frontend/css/styles.scss');
    	this.copy('_app/_frontend/_css/_variables.scss','app/frontend/css/_variables.scss');
    	this.copy('_app/_frontend/_css/_partials/_main.scss','app/frontend/css/partials/_main.scss');
      this.copy('_app/_frontend/_css/_partials/_admin.scss','app/frontend/css/partials/_admin.scss');
    	this.copy('_app/_frontend/_img/_meanstack.svg','app/frontend/img/meanstack.svg');
    	this.copy('_app/_frontend/_img/_yeoman.png','app/frontend/img/yeoman.png');
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_app.js'), 
    		this.destinationPath('app/frontend/js/app.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_controllers/_admin.js'), 
    		this.destinationPath('app/frontend/js/controllers/admin.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_controllers/_404.js'), 
    		this.destinationPath('app/frontend/js/controllers/404.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_controllers/_main.js'), 
    		this.destinationPath('app/frontend/js/controllers/main.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_controllers/_auth.js'), 
    		this.destinationPath('app/frontend/js/controllers/auth.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_services/_interceptors.js'), 
    		this.destinationPath('app/frontend/js/services/interceptors.js'), {
    			appName: this.appName
    	});
    	this.fs.copyTpl(
    		this.templatePath('_app/_frontend/_js/_services/_auth.js'), 
    		this.destinationPath('app/frontend/js/services/auth.js'), {
    			appName: this.appName
    	});
    	this.copy('_app/_frontend/_views/_main.html','app/frontend/views/main.html');
    	this.copy('_app/_frontend/_views/_404.html','app/frontend/views/404.html');
    	this.copy('_app/_frontend/_views/_admin.html','app/frontend/views/admin.html');
      this.fs.copyTpl(
          this.templatePath('_app/_frontend/_views/_header.html'),
          this.destinationPath('app/frontend/views/header.html'), {
            appName: this.appName
          }
      );
      this.fs.copyTpl(
          this.templatePath('_app/_frontend/_views/_footer.html'),
          this.destinationPath('app/frontend/views/footer.html'), {
            appName: this.appName,
            appAuthor: this.appAuthor
          }
      );
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
