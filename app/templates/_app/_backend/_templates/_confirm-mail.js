'use strict';

var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf8'));

module.exports = function (mailToSend, firstname, key) {


	var template = {
		from: '<%= appName %>', 
		to: mailToSend, 
		subject: 'Registration to <%= appName %>', 
		text: 	'',
		html: 	'<h1>Thank you for joining <%= appName %> !</h1>\n'+
				'<p>Hi '+firstname+', welcome to the community. Here\'s '+
				'the confirmation mail for your registration on your website. If '+
				'you didn\'t ask this resgistration, please '+
				'<a href="http://'+config.production.host+':'+config.production.port+'/unvalidate?email='+mailToSend+'&key='+key+'">'+
				'click here</a> to cancel it.</p><br>\n'+
				'<a href="http://'+config.production.host+':'+config.production.port+'/validate?key='+key+'">Click here to '+
				'confirm your registration</a>'
	};


	return template;


};
