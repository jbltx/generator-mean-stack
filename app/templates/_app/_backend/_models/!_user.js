'use strict';

var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt-nodejs');

var userSchema 	= mongoose.Schema({
    fullname: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true},<% if(filters.mail) { %>
	emailConfirm: Boolean,
	emailKey: String,<% } %>
	sessioncache: String
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', userSchema);
