'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Remember = mongoose.model('Remember');


module.exports = function (passport) {

	router.post('/signup', passport.authenticate('local-signup', {failureFlash : true}), function (req, res) {
		res.send(req.user);
	});


	router.post('/signin', passport.authenticate('local-signin', {failureFlash : true}), function (req, res) {
		return Remember.findOne({login: req.user.email})
			.exec(function (err, data) {
				if (err) {return res.status(500).send(err);}
				if (data) {res.cookie('remember', data.login+'#'+data.serial_id+data.token, { maxAge: 360*24*3600000 });}
				return res.send(req.user);
			});
	});


	router.get('/signedin', function (req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});


	router.post('/signout', function (req, res) {
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


	return router;

};