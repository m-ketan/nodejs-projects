var express = require('express');
var router = express.Router();
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'})
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'})
});

router.post('/register', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if(req.files && req.files.profileimage) {
		console.log('Uploading...');
		var profileImageOriginalName = req.files.profileimage.originalname;
		var profileImageName = req.files.profileimage.name;
		var profileImageMime = req.files.profileimage.mimetype
		var profileImagePath = req.files.profileimage.path;
		var profileImageExt = req.files.profileimage.extension;
		var profileImageSize = req.files.profileimage.size;
	} else {
			var profileImageName = 'nullimage.png';
	}
	req.checkBody('name', 'Name is required!').notEmpty();
	req.checkBody('email', 'Email is invalid!').isEmail();
	req.checkBody('email', 'Email is required!').notEmpty();
	req.checkBody('username', 'Username is required!').notEmpty();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password2', 'Passwords don\'t match!').equals(req.body.password);

	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors,
			name,
			email,
			username,
			password,
			password2
		});
	} else {
			var newUser = new User({
				name,
				email,
				username,
				password,
				profileimage: profileImageName
		});
		//Create a new user
		User.createUser(newUser, function(err, user) {
			if(err) throw err;
			req.flash('success', 'User account has been created successfully!');
			res.redirect('/');
		});
	}
});

passport.use(new LocalStrategy(
		function (username, password, done) {
			User.getUserByUsername(username, function (err, user) {
				if(err) throw err;
				if(!user) {
					console.log('Unknown user');
					return done(null, false, {message: 'Unknown user'})
				}
			});
		}
	));

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'Invalid Username or Password'}), function(req, res) {
	console.log('Authentication Successful');
	req.flash('succes', 'You\'re logged in');
	res.redirect('/');
});

module.exports = router;