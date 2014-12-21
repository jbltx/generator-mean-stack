'use strict';


var mongoose 		= require('mongoose');<% if(filters.mail) { %>
var User 			= mongoose.model('User');<% } %>
var Remember 		= mongoose.model('Remember');
var path            = require('path');
var fs 				= require('fs');
var routesDir		= fs.readdirSync(path.join(__dirname, './routes'));


var isLoggedIn = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.sendStatus(401);
	}
	else {
		next();
	}
};


module.exports = function (app, passport) {


	routesDir.forEach(function (filename) {
		if (filename.indexOf('.js') >-1) {
			var routename = filename.substr(0, filename.length-3);
			app.use('/'+routename, require('./routes/'+routename)(isLoggedIn));
		}
	});
	
	app.post('/signup', passport.authenticate('local-signup', {failureFlash : true}), function (req, res) {
		res.send(req.user);
	});


	app.post('/signin', passport.authenticate('local-signin', {failureFlash : true}), function (req, res) {
		return Remember.findOne({login: req.user.email})
			.exec(function (err, data) {
				if (err) {return res.status(500).send(err);}
				if (data) {res.cookie('remember', data.login+'#'+data.serial_id+data.token, { maxAge: 360*24*3600000 });}
				return res.send(req.user);
			});
	});


	app.get('/signedin', function (req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});


	app.post('/signout', function (req, res) {
		Remember.findOne({login: req.user.email}, function (err, token) {
			if (err) {
				throw err;
			}
			if (token) {
				token.remove(function (err) {
					if (err) { throw err; }
				});
			}
			req.logOut();
			res.sendStatus(200);
		});
	});

	<% if(filters.mail) { %>
	app.post('/validate', function (req, res) {
		User.findOne({ emailKey: req.body.key }, function (err, user) {
			if (err || !user) { return res.sendStatus(404); }
			if (user.emailConfirm === true) {
				return res.sendStatus(403);
			}
			else {
				User.update({ emailKey: req.body.key }, { emailConfirm: true }, { multi: true }, function (err, nb) {
					if (err) { return res.sendStatus(404); }
					if (nb === 1) {
						res.sendStatus(200);
					}
					else {
						res.sendStatus(500);
					}
				});
			}
		});
				
	});

	
	app.post('/unvalidate', function (req, res) {
		User.findOne({emailKey: req.body.key, email: req.body.email}, function (err, user) {
			if (err || !user) { return res.sendStatus(404); }
			if (user.emailConfirm === true) {
				return res.sendStatus(403);
			}
			else {
				User.remove({ _id: user._id}, function (err) {
					if (err) { return res.sendStatus(404); }
					res.sendStatus(200);
				});
			}
		});
	});
	<% } %>

};
