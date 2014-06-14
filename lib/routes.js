'use strict';

var passport = require('passport');
var api = require('./controllers/api'),
	index = require('./controllers'),
	users = require('./controllers/users'),
	session = require('./controllers/session'),
	middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['public_profile', 'email', ]
	}));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/home',
			failureRedirect: '/login'
		}));


	// Server API Routes
	app.route('/api/awesomeThings')
		.get(api.awesomeThings);

	app.route('/api/gear')
		.get(api.gear);

	app.route('/api/users')
		.post(users.create)
		.put(users.changePassword);

	app.route('/api/users/me')
		.get(users.me);

	app.route('/api/users/:id')
		.get(users.show);

	app.route('/api/session')
		.post(session.login)
		.delete(session.logout);


	// All undefined api routes should return a 404
	app.route('/api/*')
		.get(function(req, res) {
			res.send(404);
		});

	// All other routes to use Angular routing in app/scripts/app.js
	app.route('/partials/*')
		.get(index.partials);

	app.route('/*')
		.get(middleware.setUserCookie, index.index);
};