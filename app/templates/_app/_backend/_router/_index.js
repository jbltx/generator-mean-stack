/**
* Index of Express Router
*
*/
'use strict';


/**
* Variables declaration
*
*/
var path            = require('path');
var fs 				= require('fs');
var routesDir		= fs.readdirSync(path.join(__dirname, './routes'));
var authDir 		= fs.readdirSync(path.join(__dirname, './auth'));

/**
* Creation of isLoggedIn middleware, which tests if user is logged in
* to permit request continuation.
*
*/
var isLoggedIn = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.sendStatus(401);
	}
	else {
		next();
	}
};

/**
* Express Router declaration
*
*/
var ExpressRouter = function (app, passport) {


	routesDir.forEach(function (filename) {
		if (filename.indexOf('.js') >-1) {
			var routename = filename.substr(0, filename.length-3);
			app.use('/'+routename, require('./routes/'+routename)(isLoggedIn));
		}
	});

	authDir.forEach(function (filename) {
		if (filename.indexOf('.js') > -1) {
			var authname = filename.substr(0, filename.length-3);
			app.use('/', require('./auth/'+authname)(passport));
		}
	});

};

/**
* Export declared Express Router
*
*/
module.exports = ExpressRouter;
