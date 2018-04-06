
const express = require('express');
const router = express.Router();
const tweets = require('./controller');

router.get('/tweets', tweets.getTweets);

module.exports = router;