'use strict';

var FacebookStrategy = require('passport-facebook');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var config = require(path.join(__dirname, '../../../config.json'));


module.exports = function (env, passport <% if(filters.mail) { %>, transporter<% } %>) {


	passport.use(new FacebookStrategy({

		clientID: config.oauth.facebook.clientID,
		clientSecret: config.oauth.facebook.clientSecret,
		callbackURL: 'http://'+ config[env].host +':'+ config[env].port +'/auth/facebook/callback',
		enableProof: false

	}, function (accessToken, refreshToken, profile, done) {

		User.findOrCreate({ facebookId: profile.id }, function (err, user) {
	      return done(err, user);
	    });

	}));


};
