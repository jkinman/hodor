'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gear Schema
 */
var GearSchema = new Schema({
	name: String,
	info: String,
	image: String,
	thumb: String,
	type: String,
	price: Number,
	style: String
});

/**
 * Validations
 */
// GearSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('Gear', GearSchema);