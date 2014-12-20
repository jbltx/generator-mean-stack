'use strict';


var mongoose 		= require('mongoose');
var User 			= mongoose.model('User');
var Remember 		= mongoose.model('Remember');
var path            = require('path');
var fs 				= require('fs');
var routesDir		= fs.readdirSync(path.join(__dirname, './routes'));


var isLoggedIn = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.send(401);
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
		req.logOut();
		res.send(200);
	});

	app.post('/validate', function (req, res) {
		User.findOne({ emailKey: req.body.key }, function (err, user) {
			if (err || !user) { return res.status(404).end(); }
			if (user.emailConfirm === true) {
				return res.status(403).end();
			}
			else {
				User.update({ emailKey: req.body.key }, { emailConfirm: true }, { multi: true }, function (err, nb) {
					if (err) { return res.statut(404).end(); }
					if (nb === 1) {
						res.status(200).end();
					}
					else {
						res.status(500).end();
					}
				});
			}
		});
				
	});

	
	app.post('/unvalidate', function (req, res) {
		User.findOne({emailKey: req.body.key, email: req.body.email}, function (err, user) {
			if (err || !user) { return res.status(404).end(); }
			if (user.emailConfirm === true) {
				return res.status(403).end();
			}
			else {
				User.remove({ _id: user._id}, function (err) {
					if (err) { return res.status(404).end(); }
					res.status(200).end();
				});
			}
		});
	});


};
