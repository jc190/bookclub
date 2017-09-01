'use strict';

module.exports = {
	'googleBooksAuth': {
		key: process.env.GOOGLE_BOOKS_KEY
	},
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};
