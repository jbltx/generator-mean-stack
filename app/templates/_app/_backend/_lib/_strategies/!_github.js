'use strict';

var GitHubStrategy = require('passport-github');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var config = require(path.join(__dirname, '../../../config.json'));


module.exports = function (env, passport <% if(filters.mail) { %>, transporter<% } %>) {


	passport.use(new GitHubStrategy({

		clientID: config.oauth.github.clientID,
    	clientSecret: config.oauth.github.clientSecret,
    	callbackURL: 'http://' + config[env].host +':'+ config[env].port +'/auth/google/callback'

	}, function (accessToken, refreshToken, profile, done) {

		User.findOrCreate({ githubId: profile.id }, function (err, user) {
	      return done(err, user);
	    });

	}));


};
