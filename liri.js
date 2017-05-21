var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

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

console.log("---------------");
console.log("enter any of these commands to see results");
console.log("");
console.log("spotify-this-song <song name>");
console.log("movie-this <movie title>");
console.log("my-tweets");
// console.log(key.twitterToken);
// console.log(key.twitterTokenSecret);
// console.log(key.twitterConsumerKey);
// console.log(key.twitterConsumerSecret);

var input = process.argv[2];
var input2 = process.argv[3];

// var myTweets = process.argv[2];
// var spotifyThisSong = process.argv[3];
// var movieThis = process.argv[4];
// var doWhatItSays = process.argv[5];

// console.log(myTweets);
// console.log(spotifyThisSong);
// console.log(movieThis);
// console.log(doWhatItSays);


var params = {solracias: 'nodejs'};
client.get('statuses/user_timeline', params, function (error, tweets, response){
    if (input === "my-tweets") {
        // console.log(tweets);
        // console.log(JSON.stringify(tweets, null, 2));
        console.log("-----------")
        console.log("results")
        console.log("-----------")

        for (var i = 0; i < tweets.length; i++){
            console.log("Tweet "+ [i + 1] + ": "+ "(" + tweets[i].created_at + ") " + tweets[i].text);
        }
    }

    // else {
    //     console.log(error, "-->" + " Please type <my-tweets> to get the last 20 tweets");
    // }
})

spotify.search({type: 'track', query: input2}, function(err, data){
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

    else if (input2 == null && !err && input === "spotify-this-song"){
        spotify.search({type: 'track', query: "The Sign"}, function(err, data){
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("-----------")
            console.log("results")
            console.log("-----------")
            // console.log(JSON.stringify(data, null, 2));
            console.log("Album: " + data.tracks.items[4].album.name);
            console.log("Artist: " + data.tracks.items[4].album.artists[0].name);
            console.log("Song name: " + data.tracks.items[4].name);
            console.log("Preview URL: " + data.tracks.items[4].preview_url)
            console.log("");
        })
    }

    else if (!err && input == "spotify-this-song") {
        for (var i = 0; i < data.tracks.items.length; i++){
            console.log("-----------")
            console.log("results")
            console.log("-----------")
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("song name: " + data.tracks.items[i].name);
            console.log("Preview URL: " + data.tracks.items[i].preview_url);
            console.log("");
        }
    }

    // I might want to use this if I want this to show up when all inputs are null
    // else if (!err && input == null && input2 == null){
    //     console.log("test");
    // }

    
})


request('http://www.omdbapi.com/?i=tt3896198&apikey=23fb74b2&t='+ input2 +'', function(error, response, body){
    
    if (input2 == null && !error && input === "movie-this" && response.statusCode === 200){
        request('http://www.omdbapi.com/?i=tt3896198&apikey=23fb74b2&t=Mr.Nobody', function(error, response, body){
            // console.log(JSON.parse(body));
            console.log("-----------")
            console.log("results")
            console.log("-----------")
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("rotten tomatoes URL: " + "pending");
        })
    }
    
    else if  (!error && input === "movie-this" && response.statusCode === 200){
        // console.log(JSON.parse(body));
        console.log("-----------")
        console.log("results")
        console.log("-----------")
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("rotten tomatoes URL: " + "pending");
    }
})
