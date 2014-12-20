'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {};
<% fields.forEach(function (f) { %>
fields['<%= f.name %>'] = { 
	type: <%= f.type %>, <% if (f.default != '') { %>
	default: <%= f.default %>,  <% } %>
	required: <%= f.required %>, <% if (f.reference != '') { %>
	ref: <%= f.reference %>, <% } %>
	unique: <%= f.unique %>
};
<% }); %>

var <%= modelName %>Schema = new Schema(fields);


<%= modelName %>Schema.statics = {
	fillDoc: function (document, bodyReq, callback) {
		for (var field in this.schema.paths) {
			if(field !== '_id' && field !== '__v' && bodyReq[field] !== undefined) {
				document[field] = bodyReq[field];
			}
		}
		document.save(callback);
	}
};

mongoose.model('<%= modelName %>', <%= modelName %>Schema);

