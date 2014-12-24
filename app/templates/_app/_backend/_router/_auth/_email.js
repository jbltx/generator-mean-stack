'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function () {


	/** 
	* Validate email confirmation
	*
	*/
	router.post('/validate', function (req, res) {
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


	/** 
	* Unvalidate email confirmation
	*
	*/
	router.post('/unvalidate', function (req, res) {
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

	return router;

};