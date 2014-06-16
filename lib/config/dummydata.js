'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gear = mongoose.model('Gear'),
	Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
	Thing.create({
		name: 'HTML5 Boilerplate',
		info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
		awesomeness: 10
	}, {
		name: 'AngularJS',
		info: 'AngularJS is a toolset for building the framework most suited to your application development.',
		awesomeness: 10
	}, {
		name: 'Karma',
		info: 'Spectacular Test Runner for JavaScript.',
		awesomeness: 10
	}, {
		name: 'Express',
		info: 'Flexible and minimalist web application framework for node.js.',
		awesomeness: 10
	}, {
		name: 'MongoDB + Mongoose',
		info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
		awesomeness: 10
	}, function() {
		console.log('finished populating things');
	});
});

//Clear old things, then add things in
Gear.find({}).remove(function() {
	Gear.create({
		name: 'Classic HODOR basketball jersey 1',
		info: 'Stark wolf on the front HODOR player name on the back',
		image: 'images/T-Shirt-MockUp.png',
		thumb: 'images/T-Shirt-MockUp_thumb.png',
		price: 50
	}, {
		name: 'Classic HODOR basketball jersey 2',
		info: 'Stark wolf on the front HODOR player name on the back',
		image: 'images/T-Shirt-MockUp.png',
		thumb: 'images/T-Shirt-MockUp_thumb.png',
		price: 50
	}, {
		name: 'Classic HODOR basketball jersey 3',
		info: 'Stark wolf on the front HODOR player name on the back',
		image: 'images/T-Shirt-MockUp.png',
		thumb: 'images/T-Shirt-MockUp_thumb.png',
		price: 50
	}, {
		name: 'Classic HODOR basketball jersey 4',
		info: 'Stark wolf on the front HODOR player name on the back',
		image: 'images/T-Shirt-MockUp.png',
		thumb: 'images/T-Shirt-MockUp_thumb.png',
		price: 25
	}, function() {
		console.log('finished populating gear');
	});
});

// Clear old users, then add a default user
User.find({}).remove(function() {
	User.create({
		provider: 'local',
		name: 'Test User',
		email: 'test@test.com',
		password: 'test'
	}, function() {
		console.log('finished populating users');
	});
});