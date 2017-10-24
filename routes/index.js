var express = require('express');
var request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AirNow Alert' });
});

router.get('/aqi/:zip', function(req, res, next) {
  res.sendStatus(204);
});

module.exports = router;