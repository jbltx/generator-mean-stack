/**
 * server.js
 * This file contains the Node server instance. Frontend routes are also set up here.
 *
 */
'use strict';

/**
 * Variables initialization
 *
 */
var fs  		  = require('fs');
var express 	= require('express');
var app 		  = require('./backend/app');
var path 		  = require('path');
var logger 		= require('morgan');
var config		= JSON.parse(fs.readFileSync(path.join(__dirname, './config.json'), 'utf8'));

/**
 * Server configuration in development environment.
 *
 */
if (app.get('env') === 'development') {

	// Use morgan middleware as logger
	app.use(logger('dev'));

	// Set hostname from config file
	app.set('host', config.development.host);

	// Set port from config file
	app.set('port', config.development.port);

	// Express will use root app dir to find development dependencies in /bower_components
	app.use(express.static(path.join(__dirname, '../')));

	// Express will use /tmp dir to access to generated css files by Grunt
	app.use(express.static(path.join(__dirname, '../.tmp')));

	// Express will use /frontend dir to access to index.html and other files required by AngularJS
	app.use(express.static(path.join(__dirname, './frontend')));

	// Set all routes send index.html page
	// Note: All routes means all remaining routes, other than already set ones
	app.all('/*', function (req, res) {
		res.sendFile(path.join(__dirname, './frontend/index.html'));
	});
} 
else {

	// Set hostname from config file
	app.set('host', config.production.host);

	// Set port from config file 
	app.set('port', config.production.port);

	// Express will use /frontend dir to access to index.html and other files required by AngularJS
	app.use(express.static(path.join(__dirname, './frontend')));

	// Set all routes send index.html page
	// Note: All routes means all remaining routes, other than already set ones
	app.all('/*', function (req, res) {
		res.sendFile(path.join(__dirname, './frontend/index.html'));
	});
}


// All configuration is done, gonna listen to hostname:port...
app.listen(app.get('port'), app.get('host'), function (){
	console.log('Server in '+app.get('env')+' environment running at '+app.get('host')+':'+app.get('port'));
});
