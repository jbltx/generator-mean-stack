'use strict';

var express = require('express');
var router = express.Router();


module.exports = function (passport) {

	<% if(filters['Facebook']) { %>

	router.get('/auth/facebook', passport.authenticate('facebook'));

	router.get('/auth/facebook/callback', passport.authenticate('facebook'), function (req ,res) {
		res.send(req.user);
	});

	<% } %>


	<% if(filters['Twitter']) { %>

	router.get('/auth/twitter', passport.authenticate('twitter'));

	router.get('/auth/twitter/callback', passport.authenticate('twitter'), function (req ,res) {
		res.send(req.user);
	});

	<% } %>


	<% if(filters['Github']) { %>

	router.get('/auth/github', passport.authenticate('github'));

	router.get('/auth/github/callback', passport.authenticate('github'), function (req ,res) {
		res.send(req.user);
	});

	<% } %>


	<% if(filters['LinkedIn']) { %>

	router.get('/auth/linkedin', passport.authenticate('linkedin'));

	router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), function (req ,res) {
		res.send(req.user);
	});

	<% } %>


	<% if(filters['Google']) { %>

	router.get('/auth/google', passport.authenticate('google'));

	router.get('/auth/google/callback', passport.authenticate('google'), function (req ,res) {
		res.send(req.user);
	});

	<% } %>


	return router;

};