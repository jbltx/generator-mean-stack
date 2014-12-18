'use script';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	name: {type: String, required: true}
});

mongoose.model('Task', taskSchema);
