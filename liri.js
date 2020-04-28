require("dotenv").config();


var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require('fs');
var moment = require("moment");

// Grab search command line argument
var search = process.argv[2];

// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");


// Movie variables

var omdbURL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

// Spotify variables


// http://www.omdbapi.com/?t=scarface&y=&plot=short&apikey=trilogy

// Concert variables

var bandsURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";



// FUNCTIONS *******************************************************************************************************


function movieThis() {

    axios
        .get(omdbURL)
        .then(
            function(response) {

                console.log(". . . . . . . . . .");

                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

                console.log(". . . . . . . . . .");

            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}



function concertThis() {

    axios.get(bandsURL)
        .then(function(response) {

            console.log(". . . . . . . . . .");

            for (var i = 0; i < response.data.length; i++) {
                // log each venue name, location, date

                // Format date/time using minute.js npm package
                var dateOfEvent = response.data[i].datetime
                var dateFormatted = moment().format("MM/DD/YYYY", dateOfEvent)


                console.log("-------------------------");
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.location);
                console.log("Date of Event: " + dateFormatted);

            }

            console.log(". . . . . . . . . .");
        });
}

function spotifyThisSong() {



    spotify
        .search({
            type: 'track',
            query: term
        })
        .then(function(response) {

            console.log(". . . . . . . . . .");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log(". . . . . . . . . .");

        })
        .catch(function(err) {
            console.log(err);
        });



}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        search = dataArr[0]

        term = dataArr[1]

        console.log(search + " " + term);

        if (search === "spotify-this-song") {
            spotifyThisSong(term);
        } else if (search === "movie-this") {
            omdbURL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
            movieThis();
        } else if (search === "concert-this") {
            bandsURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
            concertThis();
        } else {
            console.log("LIRI SAYS: Sorry, I didn't catch that. Please try again.")
        }

    });
}

if (search === "spotify-this-song" && term !== "") {
    spotifyThisSong();
} else if (search === "spotify-this-song" && term === "") {
    term = "The Sign";
    spotifyThisSong(term);


} else if (search === "movie-this" && term !== "") {
    movieThis();
} else if (search === "movie-this" && term === "") {
    term = "mr nobody";
    omdbURL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
    movieThis();


} else if (search === "concert-this" && term !== "") {
    concertThis();
} else if (search === "concert-this" && term === "") {
    term = "celine dion";
    bandsURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    concertThis();

} else if (search === "do-what-it-says") {
    doWhatItSays();

} else {
    console.log("LIRI SAYS: Sorry, I don't understand. Please enter a command.")
}