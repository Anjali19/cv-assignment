const Twit = require('twit');

async function getTweets(req, res, next) {
    const T = new Twit({
        consumer_key: req.query.consumer_key || '',
        consumer_secret: req.query.consumer_secret || '',
        access_token: req.query.access_token || '',
        access_token_secret: req.query.access_token_secret || '',
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });
    await T.get('account/verify_credentials', {skip_status: true})
        .catch(function (err) {
            res.status(400);
            res.send('user not authenticated');
            return res;
        });
    
    let tweets_in_last_7_days = {};
    const tweet_summary = {};
    let max_retweet_count = 0;
    let max_favourite_tweet_count = 0;

    //api to get first n number of tweets by a particular screen_name
    await T.get('statuses/user_timeline', { screen_name : req.query.screen_name, count : 7}, function (err, data, response) {
        if (err) {
            console.log(err);
            res.status(500);
            res.send(`Internal Error while getting tweets info. Error while fetching data for ${req.query.screen_name}`);
            return res;
        } else {
            tweets_in_last_7_days = data;
        }
    });

    tweet_summary.last_tweet = tweets_in_last_7_days[0].text;
    tweet_summary.last_tweet_on = tweets_in_last_7_days[0].created_at;
    tweets_in_last_7_days.map((tweet) =>{
        if(tweet.retweet_count > max_retweet_count) {
            tweet_summary.most_retweeted_tweet_in_last_7_days = tweet.text;
        }
        if(tweet.favorite_count > max_favourite_tweet_count) {
            tweet_summary.most_favourite_tweet_in_last_7_days = tweet.text;
        }
    });

    //To get data about screen_name
    await T.get('/users/lookup', { screen_name : req.query.screen_name},  function (err, data, response) {
        if(err) {
        	console.log(err);
            res.status(500);
            res.send(`Internal Error while getting info about user. Error while fetching data for ${req.query.screen_name}`);
            return res;
    } else {
            tweet_summary.name = data[0].name;
            tweet_summary.followers_count = data[0].followers_count;
            res.status(200);
            res.send(tweet_summary);
            return res;
    }
    });
}


module.exports.getTweets = getTweets;