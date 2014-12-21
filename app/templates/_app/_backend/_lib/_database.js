/**
* backend/lib/database.js
*
* This is the main file for Express and others backend's middlewares 
* configuration.
*/
'use strict';

/**
* Variables declaration.
*
*/
var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf8'));
var mongoose = require('mongoose');

/**
* Connection to Mongo Database
*
*/
var db = function (env) {
    mongoose.connect(
    	'mongodb://' + 
    	config[env].database.user + 
    	':' + config[env].database.password + 
    	'@' + config[env].database.host + 
    	':' + config[env].database.port + 
    	'/' + config[env].database.name 
    );
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'MongoDB connection error ! '));
    connection.once('open', function callback() {
        console.log('Connected to MongoDB.');
    });
};

/**
* Export Connection function
*
*/
module.exports = db;
