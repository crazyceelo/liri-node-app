// npm require variables
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

// twitter keys
var client = new Twitter({
    consumer_key: "Qcst4zcukIvkzsaZQaCfgrNIW",
    consumer_secret: "zEfT1J7ATCKYnZqOpfE9BHlgPDFVs2OcouoHbvIU8E6SAeysfm",
    access_token_key: "866315525927849984-ryRXznD9JEEsv0FL38hjKO5dou6s6d5",
    access_token_secret: "TK7HImU2IdrhkWgP92d3hdpsQqiPNd9EGR9Q6hhrK9UJ0"
})

// twitter keys from the ./keys.js. 
var key = ({
    twitterToken : keys.twitterKeys.access_token_key,
    twitterTokenSecret : keys.twitterKeys.access_token_secret,
    twitterConsumerKey : keys.twitterKeys.consumer_key,
    twitterConsumerSecret : keys.twitterKeys.consumer_secret
})

// instructions for user when invoking "node liri.js"
console.log("---------------instructions----------------");
console.log("first you must type: node liri.js")
console.log("then type any of the following commands");
console.log("example: node liri.js spotify-this-song fancy");
console.log("");
console.log("command: spotify-this-song <song name>");
console.log("command: movie-this <movie title>");
console.log("command: my-tweets");
console.log("command: do-what-it-says");


// variables for user inputs
var input = process.argv[2];
var input1 = process.argv;
var input2 = [];
for (var i = 3; i < input1.length; i++){
    input2.push(input1[i]);
}


// invokes a users last 20 tweets and displays them.
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
    })

// spotify function to invoke songs and display details 
// about the artists that have similar song names.
function spot(input2){
        spotify.search({type: 'track', query: input2}, function(err, data){
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        else if (input2 == "" && !err && input === "spotify-this-song"){
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
    })
}

// runs the spotify function
spot(input2);


// invoke a movie title and display details about the movie.
request('http://www.omdbapi.com/?i=tt3896198&apikey=23fb74b2&t='+ input2 +'', function(error, response, body){
    
    if (input2 == "" && !error && input === "movie-this" && response.statusCode === 200){
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


// read the file and display movie details based on what is in the file.
fs.readFile('./random.txt', 'utf8', function(error, data){
    var split = data.split(",");
    for(var i = 0; i < split.length; i++){
        // console.log(split[i]);
    }
    var a = split[0];
    var b = split[1];
    var input2 = b;
    // console.log(input2);
    if (!error && input === "do-what-it-says"){
        spotify.search({type: 'track', query: input2}, function(err, data){
            // console.log(JSON.stringify(data, null, 2));
            console.log("-----------")
            console.log("results")
            console.log("-----------")
            // console.log(JSON.stringify(data, null, 2));
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url)
            console.log("");
        })
    }
});

var allInputs = input + " + "+ input2;

fs.appendFile("log.txt", "||| " + allInputs, 'utf8', function(err, data){
    console.log("");
    console.log("input logged");
})