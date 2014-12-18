'use strict';

module.exports = function (mailToSend) {


	var template = {
		from: '<%= appName %> Service <service@<%= appName %>.com>', 
		to: mailToSend, 
		subject: 'Theft tentative detected', 
		text: 	'Hello member. '+
				'We have just detected a person who has attempting to access to your '+
				'account, but he failed. We strongly recommend you to change your password '+
				'and clear your cookies from your web browser. Check also you didn\'t have a'+
				' trojan in your system which is able to view or send your personnal cookies.'+
				'None informations have been seen by the hacker. Don\'t worry.',
		html: 	'<h1>Hello Pipeline member</h1>\n'+
				'<p>We have just detected a person who has attempting to access to your '+
				'account, but he failed. We strongly recommend you to change your password '+
				'and clear your cookies from your web browser. Check also you didn\'t have a'+
				' trojan in your system which is able to view or send your personnal cookies.</p>'+
				'<p>None informations have been seen by the hacker. Don\'t worry.</p>'
	};

	return template;
};
