'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.render('index', { title: 'Home', user: req.user });
		});

	app.route('/login')
		.get(function (req, res) {
			res.render('login', { title: 'Login' });
			// res.sendFile(path + '/public/login.html');
		});

	app.route('/signup')
		.get(function (req, res) {
			res.render('signup', { title: 'Sign up' });
			// res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/dashboard')
		.get(isLoggedIn, function (req, res) {
			res.render('dashboard', { title: 'Dashboard', user: req.user });
			// res.sendFile(path + '/public/profile.html');
		});

	app.route('/library')
		.get(isLoggedIn, function (req, res) {
			res.render('library', { title: 'Library', user: req.user });
			// res.sendFile(path + '/public/profile.html');
		});

	app.route('/settings')
		.get(isLoggedIn, function (req, res) {
			res.render('settings', { title: 'Profile Settings', user: req.user });
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

};
