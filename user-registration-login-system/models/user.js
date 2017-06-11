const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/userauth');

const db = mongoose.connection;

// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	profileimage:{
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
	User.findOne({username}, callback);
}

// Compares user entered pwd against stored hashed pwd
module.exports.comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

// Create user function, encrypts user entered pwd to hashed pwd
module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}