'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
	sendgrid_hostname: 'email.sendgrid.biz',
	root: rootPath,
	ip: '0.0.0.0',
	port: process.env.PORT || 9000,
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	}
};