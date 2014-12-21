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
var strategiesDir 	= fs.readdirSync(path.join(__dirname, './lib/strategies'));
var modelsDir		= fs.readdirSync(path.join(__dirname, './models'));<% if(filters.mail) { %>
var nodemailer 		= require('nodemailer');<% } %>

/**
* Check environment configuration
*
*/
app.set('env', app.get('env') || 'production');
<% if(filters.mail) { %>
/**
* Configure mail service
*
*/
var transporter = nodemailer.createTransport(config[app.get('env')].mail);<% } %>

/**
* MongoDB connection.
*
*/
require('./lib/database')(app.get('env'));

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
strategiesDir.forEach(function (file) {
	if (file.indexOf('.js') >-1) {
		require('./lib/strategies/'+file)(passport<% if(filters.mail) { %>, transporter<% } %>);
	}
});

/**
* Enable cookie middleware
*
*/
app.use(cookieParser(config[app.get('env')].cookieSecret, { httpOnly: true }));

/**
* Enable parser middleware
*
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
* Enable session middleware
*
*/
app.use(session({ 
	name: 'sessionID', 
	secret: config[app.get('env')].sessionSecret, 
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

/**
* Enable authentication strategies
*
*/
app.use(passport.initialize());

/**
* Enable session middleware from passport
*
*/
app.use(passport.session());

/**
* Enable flash middleware (used to send message from authentication strategies to route callbacks)
*
*/
app.use(flash());

/**
* Enable CSRF protection
*
*/
app.use(csrf());

/**
* Create a token called 'XSRF-TOKEN' with value managed by csrf middleware. 
* Send the token in every request results
*
* More info here : http://stackoverflow.com/a/27426757/2904349
*
*/
app.use(function(req, res, next) {
	res.cookie('XSRF-TOKEN', req.csrfToken());
  	next();
});

/**
* Set backend router to manage requests
*
*/
require('./router')(app, passport);



/**
* Export the configured Express app
*
*/
module.exports = app;
