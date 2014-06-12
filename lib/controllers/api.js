'use strict';

var mongoose = require('mongoose'),
	Gear = mongoose.model('Gear'),
    Thing = mongoose.model('Thing');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};


// gear endpoint 

exports.gear = function( req, res ) {
	return Gear.find( function(err, things) {
		if( !err ) {
			return res.json( things );				
		}
		else {
			return res.send( err );
		}
	});
};