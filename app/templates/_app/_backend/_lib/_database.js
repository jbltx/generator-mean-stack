'use strict';


var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf8'));
var mongoose = require('mongoose');


var db = function () {
    mongoose.connect(
    	'mongodb://' + 
    	config.database.user + 
    	':' + config.database.password + 
    	'@' + config.database.host + 
    	':' + config.database.port + 
    	'/' + config.database.name 
    );
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'MongoDB connection error ! '));
    connection.once('open', function callback() {
        console.log('Connected to MongoDB.');
    });
};


module.exports = db();
