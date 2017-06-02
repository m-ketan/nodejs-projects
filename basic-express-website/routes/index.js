var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About Us' });
});
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact Us' });
});

router.post('/contact/send', (req, res, next) => {
	//res.json(req.body);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: '', //Put username & password.
			pass: ''
		}
	});
	var mailOptions = {
		from: '', //Supply all the following details
		to: '',
		subject: '',
		text: 'New submission: ' +req.body.name+ '' +req.body.email+ '' +req.body.message,
		html: '<p>New submission</p><p>' +req.body.name+'</p><p>' +req.body.email+ '</p><p>' +req.body.message+'</p>'
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if(err) {
			console.log(err);
			res.redirect('/contact');
		} else {
			console.log("Successful");
			res.redirect('/');
		}
	});
});

module.exports = router;
