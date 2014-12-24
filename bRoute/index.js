'use strict';


var yeoman = require('yeoman-generator');
var chalk = require('chalk');


module.exports = yeoman.generators.Base.extend({


	constructor: function () {

		yeoman.generators.Base.apply(this, arguments);
		this.option('skip-model');
		this.argument('routeName', { type: String, required: false });
	},


	initializing: function () {

    	this.pkg = require('../package.json');

  	},


	prompting: function () {

		var done = this.async();

		this.log(chalk.yellow.bold('\nThis sub-generator will help you to create a new route in the application backend-side.\n'));

		var routeQuestions = [];

		if (!this.routeName) {
			routeQuestions.push({
				type: 'input',
				name: 'routeName',
				message: 'Enter the route name ('+chalk.green.bold('test')+' will give '+chalk.green.bold('/test/:id')+' for example) :',
				default: 'test'
			});
		}

		routeQuestions.push({
			type: 'confirm',
			name: 'isRestricted',
			message: 'Will the route have a '+chalk.red.bold('restricted')+' access (only for logged-in users) ? ',
			default: true
		},{
			type: 'confirm',
			name: 'isCrud',
			message: 'Do you want to set a default '+chalk.green.bold('CRUD')+' service on the route ?',
			default: true
		});


		this.prompt(routeQuestions, function (props) {
			this.routeName = this.routeName || props.routeName;
			this.isRestricted = props.isRestricted;
			this.isCrud = props.isCrud;

			done();
		}.bind(this));

	},


	writing: {

		routeFile: function() {	
			
			this.fs.copyTpl(
				this.templatePath('_route.js'),
				this.destinationPath('app/backend/router/routes/'+this.routeName+'.js'),
				{
					routeName: this.routeName,
					isRestricted: this.isRestricted,
					isCrud: this.isCrud
				}
			);
			
		}

	},


	install: function () {
		if (this.isCrud && !this.options['skip-model']) {
			this.spawnCommand('yo', ['mean-stack:bModel', this.routeName]);
		}
	},


	end: function () {
		this.log(chalk.green.bold('\nThe route generation is done.\n'));
		if (this.isCrud && !this.options['skip-model']) {
			this.log(chalk.green.bold('The process continues with Mongoose model creation...\n'));
		}
	}


});