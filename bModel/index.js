'use strict';


var yeoman = require('yeoman-generator');
var chalk = require('chalk');


module.exports = yeoman.generators.Base.extend({


	constructor: function () {

		yeoman.generators.Base.apply(this, arguments);
		this.argument('modelName', { type: String, required: false });
	},


	initializing: function () {

    	this.pkg = require('../package.json');

  	},


  	prompting: {
  		prompt1: function () {
	  		var done = this.async();

	  		var modelQuestions = [];

	  		if(!this.modelName) {
	  			modelQuestions.push({
	  				type: 'input',
	  				name: 'modelName',
	  				message: 'Model name :',
	  				default: 'test'
	  			});
	  		}

	  		this.prompt(modelQuestions, function (answers) {

	  			this.modelName = this.modelName || answers.modelName;
	  			done();
	  		}.bind(this));	  		

	  	},

	  	prompt2: function () {
	  		this.fields= [];
	  		var done = this.async();
	  		var fieldQuestions = [{
	  			type: 'input',
	  			name: 'fieldName',
	  			message: 'Enter a field name for your model schema',
	  			default: 'name'
	  		},{
	  			type:'list',
	  			name: 'fieldType',
	  			message: 'Choose the field type :',
	  			choices: [
	  				'String', 
	  				'Date', 
	  				'Number',
	  				'Buffer',
	  				'Boolean', 
	  				'Mixed',
	  				'ObjectId',
	  				'Array',
	  				'[String]',
	  				'[Date]', 
	  				'[Number]',
	  				'[Buffer]',
	  				'[Boolean]', 
	  				'[Mixed]',
	  				'[ObjectId]']
	  		},{
	  			type:'input',
	  			name: 'fieldDefault',
	  			message: 'Default field value (leave blank if not needed):',
	  			default: ''
	  		},{
	  			type:'confirm',
	  			name: 'fieldReq',
	  			message: 'Is it a required field ? (must always have a value)',
	  			default: false
	  		},{
	  			type:'input',
	  			name: 'fieldRef',
	  			message: 'If the field refers to another schema field, please write the path here, if not leave blank.',
	  			default: ''
	  		},{
	  			type:'confirm',
	  			name: 'fieldUnique',
	  			message: 'Is it a field with unique values ?',
	  			default: false
	  		},{
			  	type: "confirm",
			    name: "askAgain",
			    message: "Want to enter another field ?",
			    default: true
			}];

			function ask (that) {

		  		that.prompt(fieldQuestions, function (answers) {
		  			var newField = {};
		  			newField.name = answers.fieldName;
		  			newField.type = answers.fieldType;
		  			newField.default = answers.fieldDefault;
		  			newField.required = answers.fieldReq;
		  			newField.reference = answers.fieldRef;
		  			newField.unique = answers.fieldUnique;
		  			that.fields.push(newField);
		  			if(answers.askAgain) {
		  				ask(that);
		  			} else {
		  				done();
		  			}
		  		});
	  		}
	  		ask(this);
	  	}

  	},


  	writing: {

		modelFile: function() {	
			
			this.fs.copyTpl(
				this.templatePath('_model.js'),
				this.destinationPath('app/backend/models/'+this.modelName+'.js'),
				{
					modelName: this.modelName,
					fields : this.fields
				}
			);
			
		}

	},


  	end: function () {
  		this.log(chalk.green.bold('\nThe model generation is done.\n'));
  	}


});