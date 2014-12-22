'use strict';

var TwitterStrategy = require('passport-twitter');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var config = require(path.join(__dirname, '../../../config.json'));


module.exports = function (env, passport <% if(filters.mail) { %>, transporter<% } %>) {


	passport.use(new TwitterStrategy({

		consumerKey: config.oauth.twitter.consumerKey,
    	consumerSecret: config.oauth.twitter.consumerSecret,
    	callbackURL: 'http://' + config[env].host +':'+ config[env].port +'/auth/twitter/callback'

	}, function (accessToken, refreshToken, profile, done) {

		User.findOrCreate({ twitterId: profile.id }, function (err, user) {
	      return done(err, user);
	    });

	}));


};
