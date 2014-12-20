var js = require('uglifyjs');
var fs = require('fs');



fs.readFile('./app/templates/_app/_backend/_router/_index.js', 'utf-8', function (err, data) {
	if (err) {
		console.log(err);
	}

	else {
		if (data.indexOf('(app, passport) {')>-1) {
			var newRoute = '\n\tapp.use(\'/test\', require(\'./routes/test\')(isLoggedIn));';
			var position = data.indexOf('app, passport) {')+17;
			var output = [data.slice(0, position), newRoute, data.slice(position)].join('');
			console.log(output);
		}
		else {
			console.log('no index');
		}
	}
});

