var express = require('express');
var router = express.Router();

/* GET users listing. */
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
	var name = req.body.name
	var email = req.body.email
	var username = req.body.username
	var password = req.body.password
	var password2 = req.body.password2

	if(req.files.profilepic) {
		console.log('Uploading...');
		var profilepicOriginalName = req.files.profilepic.originalname;
		var profilepicName = req.files.profilepic.name;
		var profilepicMime = req.files.profilepic.mimetype
		var profilepicPath = req.files.profilepic.path;
		var profilepicExt = req.files.profilepic.extension;
		var profilepicSize = req.files.profilepic.size;
	} else {
		var profilepicName = 'nullimage.png';
	}
	req.checkBody('name', 'Name is required!').notEmpty();
	req.checkBody('email', 'Email is invalid!').isEmail();
	req.checkBody('email', 'Email is required!').notEmpty();
	req.checkBody('username', 'Username is required!').notEmpty();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password2', 'Passwords don\'t match!').equals(req.body.password);
});

module.exports = router;