'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * User Schema
 */
var UserSchema = new Schema({
	displayName: String,
	name: String,
	gender: String,
	email: {
		type: String,
		lowercase: true
	},
	role: {
		type: String,
		default: 'user'
	},
	hashedPassword: String,
	provider: String,
	profileUrl: String,
	salt: String,
	facebook: {},
	_json: {},
	twitter: {},
	github: {},
	google: {}
});
// { // facebook return
// 	id: '10154238752430483',
// 	username: undefined,
// 	displayName: 'Joel Kinman',
// 	name: {
// 		familyName: 'Kinman',
// 		givenName: 'Joel',
// 		middleName: undefined
// 	},
// 	gender: 'male',
// 	profileUrl: 'https://www.facebook.com/app_scoped_user_id/10154238752430483/',
// 	provider: 'facebook',
// 	_raw: '{"id":"10154238752430483","first_name":"Joel","gender":"male","last_name":"Kinman","link":"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/10154238752430483\\/","locale":"en_US","name":"Joel Kinman","timezone":-7,"updated_time":"2014-06-06T07:38:52+0000","verified":true}',
// 	_json: {
// 		id: '10154238752430483',
// 		first_name: 'Joel',
// 		gender: 'male',
// 		last_name: 'Kinman',
// 		link: 'https://www.facebook.com/app_scoped_user_id/10154238752430483/',
// 		locale: 'en_US',
// 		name: 'Joel Kinman',
// 		timezone: -7,
// 		updated_time: '2014-06-06T07:38:52+0000',
// 		verified: true
// 	}
// };
/**
 * Virtuals
 */
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

// Basic info to identify the current authenticated user in the app
UserSchema
	.virtual('userInfo')
	.get(function() {
		return {
			'name': this.name || this.displayName,
			'role': this.role,
			'gender': this.gender,
			'provider': this.provider
		};
	});

// Public profile information
UserSchema
	.virtual('profile')
	.get(function() {
		return {
			'name': this.name,
			'role': this.role
		};
	});

/**
 * Validations
 */

// Validate empty email
UserSchema
	.path('email')
	.validate(function(email) {
		// if you are authenticating by any of the oauth strategies, don't validate
		if (authTypes.indexOf(this.provider) !== -1) return true;
		return email.length;
	}, 'Email cannot be blank');

// Validate empty password
UserSchema
	.path('hashedPassword')
	.validate(function(hashedPassword) {
		// if you are authenticating by any of the oauth strategies, don't validate
		if (authTypes.indexOf(this.provider) !== -1) return true;
		return hashedPassword.length;
	}, 'Password cannot be blank');

// Validate email is not taken
UserSchema
	.path('email')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({
			email: value
		}, function(err, user) {
			if (err) throw err;
			if (user) {
				if (self.id === user.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
	return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
	.pre('save', function(next) {
		if (!this.isNew) return next();

		if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
			next(new Error('Invalid password'));
		else
			next();
	});

/**
 * Methods
 */
UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

module.exports = mongoose.model('User', UserSchema);