'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	name: {type: String, required: true}
});


taskSchema.statics = {
	fillDoc: function (document, bodyReq, callback) {
		for (var field in this.schema.paths) {
			if(field !== '_id' && field !== '_v' && bodyReq[field] !== undefined) {
				document[field] = bodyReq[field];
			}
		}
		document.save(callback);
	}
};

mongoose.model('Task', taskSchema);
