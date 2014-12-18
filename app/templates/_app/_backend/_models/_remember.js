'use strict';

var mongoose 	= require('mongoose');

var rememberSchema = mongoose.Schema({
	login: {type: String},
	serial_id: {type: String},
	token: {type: String}
});

mongoose.model('Remember', rememberSchema, '_remember_tokens');
