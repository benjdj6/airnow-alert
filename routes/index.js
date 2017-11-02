var express = require('express');
var request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AirNow Alert' });
});

router.get('/aqi/:zip', function(req, res, next) {
  var options = {
    url: 'http://www.airnowapi.org/aq/observation/zipCode/current/',
    qs: {
      'format': 'application/json',
      'zipCode': req.params.zip,
      'distance': 25,
      'API_KEY': process.env.SECRET
    }
  };

   request(options, function(err, response, body) {
    if(err) {
      res.json(response.statusCode);
    }
    else {
      res.json(JSON.parse(body));
    }
   });
});

module.exports = router;