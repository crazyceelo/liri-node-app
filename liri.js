var keys = require("./keys.js");
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: "Qcst4zcukIvkzsaZQaCfgrNIW",
    consumer_secret: "zEfT1J7ATCKYnZqOpfE9BHlgPDFVs2OcouoHbvIU8E6SAeysfm",
    access_token_key: "866315525927849984-ryRXznD9JEEsv0FL38hjKO5dou6s6d5",
    access_token_secret: "TK7HImU2IdrhkWgP92d3hdpsQqiPNd9EGR9Q6hhrK9UJ0"
})

var key = ({
    twitterToken : keys.twitterKeys.access_token_key,
    twitterTokenSecret : keys.twitterKeys.access_token_secret,
    twitterConsumerKey : keys.twitterKeys.consumer_key,
    twitterConsumerSecret : keys.twitterKeys.consumer_secret
})

console.log(key.twitterToken);
console.log(key.twitterTokenSecret);
console.log(key.twitterConsumerKey);
console.log(key.twitterConsumerSecret);

var myTweets = process.argv[2];
var spotifyThisSong = process.argv[3];
var movieThis = process.argv[4];
var doWhatItSays = process.argv[5];

console.log(myTweets);
console.log(spotifyThisSong);
console.log(movieThis);
console.log(doWhatItSays);


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function (error, tweets, response){
    if (!error) {
        console.log(JSON.stringify(tweets, null, 2));
    }
})