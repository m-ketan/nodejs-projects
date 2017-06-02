var express = require('express');
var router = express.Router();

/* GET home page. */
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
});

module.exports = router;
