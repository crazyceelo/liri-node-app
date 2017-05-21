var twitter = require("./keys.js");

var client = ({
    twitterToken : twitter.twitterKeys.access_token_key,
    twitterTokenSecret : twitter.twitterKeys.access_token_secret,
    twitterConsumerKey : twitter.twitterKeys.consumer_key,
    twitterConsumerSecret : twitter.twitterKeys.consumer_secret
})

// console.log(client.twitterToken);
// console.log(client.twitterTokenSecret);
// console.log(client.twitterConsumerKey);
// console.log(client.twitterConsumerSecret);

var myTweets = process.argv[2];
var spotifyThisSong = process.argv[3];
var movieThis = process.argv[4];
var doWhatItSays = process.argv[5];