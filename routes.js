
const express = require('express');
const router = express.Router();
const tweets = require('./tweets/controller');
const views = require('./views/controller');

router.get('/tweets', tweets.getTweets);
router.get('/views', views.showMainPage);

module.exports = router;