var express = require('express');
var request = require('request');

var router = express.Router();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);

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

// POST new user session/login
router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      returnnext(err);
    }

    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;