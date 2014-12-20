'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();<% if(isCrud) { %>
var Model= mongoose.model('<%= routeName %>');<% } %>

module.exports = function (isLoggedIn) {

	router.get('/', <% if(isRestricted) { %>isLoggedIn, <% } %>function (req, res) {<% if(isCrud) { %>
		Model.find(function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (data.length === 0) {
				return res.send('0');
			}
			return res.status(200).send(data);
		});<% } else { %>
		res.status(200).end();<% } %>
	});
<% if(isCrud) { %>
	router.post('/', <% if(isRestricted) { %>isLoggedIn, <% } %>function (req, res) {
		var newData = new Model();
		Model.fillDoc(newData, req.body, function (err) {
			if(err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(newData);
		});
	});

	router.get('/:id', <% if(isRestricted) { %>isLoggedIn, <% } %>function (req, res) {
		Model.findById(req.params.id, function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (!data) {
				return res.status(404).end();
			}
			return res.status(200).send(data);
		});
	});

	router.put('/:id', <% if(isRestricted) { %>isLoggedIn, <% } %>function (req, res) {
		Model.findById(req.params.id, function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (!data) {
				return res.status(404).end();
			}
			Model.fillDoc(data, req.body, function (err) {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).send(data);
			});
		});
	});	

	router.delete('/:id', <% if(isRestricted) { %>isLoggedIn, <% } %>function (req, res) {
		Model.findById(req.params.id, function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			if (!data) {
				return res.status(404).end();
			}
			data.remove(function (err) {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).end();
			});				
		});
	});	
<% } %>
	return router;

};