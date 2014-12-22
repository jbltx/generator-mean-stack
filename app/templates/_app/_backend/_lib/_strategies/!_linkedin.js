'use strict';

var LinkedInStrategy = require('passport-linkedin');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var config = require(path.join(__dirname, '../../../config.json'));


module.exports = function (env, passport <% if(filters.mail) { %>, transporter<% } %>) {


	passport.use(new LinkedInStrategy({

		consumerKey: config.oauth.linkedin.consumerKey,
    	consumerSecret: config.oauth.linkedin.consumerSecret,
    	callbackURL: 'http://' + config[env].host +':'+ config[env].port +'/auth/linkedin/callback'

	}, function (accessToken, refreshToken, profile, done) {

		User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
	      return done(err, user);
	    });

	}));


};
