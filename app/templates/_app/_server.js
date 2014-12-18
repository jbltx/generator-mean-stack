'use strict';


var fs  		  = require('fs');
var express 	= require('express');
var app 		  = require('./backend/app');
var path 		  = require('path');
var logger 		= require('morgan');
var config		= JSON.parse(fs.readFileSync(path.join(__dirname, './config.json'), 'utf8'));


if (app.get('env') === 'development') {
	app.use(logger('dev'));
	app.set('host', config.development.host);
	app.set('port', config.development.port);
	app.use(express.static(path.join(__dirname, '../'))); 			//bower_components
	app.use(express.static(path.join(__dirname, '../.tmp'))); 		//styles
	app.use(express.static(path.join(__dirname, './frontend')));	//scripts
	app.all('/*', function (req, res) {
		res.sendFile(path.join(__dirname, './frontend/index.html'));
	});
} 
else {
	app.set('host', config.production.host);
	app.set('port', config.production.port);
	app.use(express.static(path.join(__dirname, './frontend')));
	app.all('/*', function (req, res) {
		res.sendFile(path.join(__dirname, './frontend/index.html'));
	});
}


app.listen(app.get('port'), app.get('host'), function (){
	console.log('Server running at '+app.get('host')+':'+app.get('port'));
});
