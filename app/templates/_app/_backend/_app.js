/**
* backend/app.js
*
* This is the main file for Express and others backend's middlewares 
* configuration.
*/
'use strict';

/**
* Variables declaration.
*
*/
var express         = require('express');
var app 			= express();
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var path            = require('path');
var csrf 			= require('csurf');
var fs 				= require('fs');
var config 			= JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));
var modelsDir		= fs.readdirSync(path.join(__dirname, './models'));
var nodemailer 		= require('nodemailer');
var transporter 	= nodemailer.createTransport(config.mail);

/**
* MongoDB connection.
*
*/
require('./lib/database');

/**
* Inject all javascript files contained in 'models' directory.
*
*/
modelsDir.forEach(function (file) {
	if (file.indexOf('.js') >-1) {
		require('./models/' + file);
	}
});

/**
* Configure strategies for Passport.
*
*/
require('./lib/strategies')(passport, transporter);


app.use(cookieParser(config.cookieSecret, { httpOnly: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
	name: 'sessionID', 
	secret: config.sessionSecret, 
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: 2*60*60*1000
	},
	rolling: true, 
	resave: false, 
	saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(csrf());
app.use(function(req, res, next) {
	res.cookie('XSRF-TOKEN', req.csrfToken());
  	next();
});


require('./router')(app, passport);


module.exports = app;
