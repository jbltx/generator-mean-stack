'use strict';

var GoogleStrategy = require('passport-google-oauth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var config = require(path.join(__dirname, '../../../config.json'));


module.exports = function (env, passport <% if(filters.mail) { %>, transporter<% } %>) {


	passport.use(new GoogleStrategy({

		consumerKey: config.oauth.google.consumerKey,
    	consumerSecret: config.oauth.google.consumerSecret,
    	callbackURL: 'http://' + config[env].host +':'+ config[env].port +'/auth/google/callback'

	}, function (accessToken, refreshToken, profile, done) {

		User.findOrCreate({ googleId: profile.id }, function (err, user) {
	      return done(err, user);
	    });

	}));


};
