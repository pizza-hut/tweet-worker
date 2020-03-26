require('dotenv').config();
//var twitterConfig = require('./twitter-config.js');

var Twitter = require('twitter');
var db = require('./db');

var port = process.env.PORT;
var twitterUser = process.env.TWITTER_USER;

var uuid = require('uuid/v4');

var params = {
    q: '-RT',
    from: twitterUser,
    count: 10,
    result_type: 'recent',
    lang: 'en'
};

var twitterConfig = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

var twitterClient = new Twitter(twitterConfig);

db.insertDoc({"user":"@test_user", "text":"a tweet..."});

function startStream() {
    var stream = twitterClient.stream('statuses/filter', { follow: '25073877' });
    //1068402768
    //var stream = twitterClient.stream('statuses/filter', {follow: '1068402768'});
    //var stream = twitterClient.stream('statuses/filter', {track: '@realDonaldTrump'});
    stream.on('data', function (event) {
        db.insertDoc(event);
        /*
        console.log(event);
        if (event.text.indexOf("@realDonaldTrump") > 0) {
            db.insertDoc({"text":event.text, "created_date":Date.now()});    
            //if (event.text.indexOf("RT @realDonaldTrump") > 0) {
            //    console.log(event.text);
            //};
        };
        */
        //console.log("event text:" + event.text)
    });

    stream.on('error', function (error) {
        throw error;
    });
};

//startStream();

/*
twitterClient.get('search/tweets', params, function(err, data, response) {
    // If there is no error, proceed
    if(!err){
      // Loop through the returned tweets
      for(let i = 0; i < data.statuses.length; i++){
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str }
        console.log(data.statuses[i].text);
        //tweetCollection.add("realDonaldtrump", data.statuses[i].text, data.statuses[i].created_at);
      }

    } else {
      console.log(err);
    }
  })
*/



//console.log(port);

//var result = db.query({"user": "realDonaldTrump"});
//console.log(result);


//db.testConnection();
