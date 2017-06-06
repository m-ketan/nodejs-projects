var mongoose = require('mongoose');
var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String,
	},
	name: {
		type: String
	},
	profileimage: {
		type: String
	}
});

module.exports = mongoose.model('User', UserSchema);
