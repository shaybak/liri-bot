require("dotenv").config();

var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

// Grab search command line argument
var search = process.argv[2];

// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");

// Movie variables
var movie = "scarface";

var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// Concert variables
var artist = "tool";

var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

function movieThis() {

    axios
        .get(omdbURL)
        .then(
            function(response) {
                console.log("The movie's rating is: " + response.data.imdbRating);
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

concertThis();

function concertThis() {
    axios.get(bandsURL)
        .then(function(response) {
            //log name of venue, 

            console.log(response.data);

            // response.data.venue.name

            for (var i = 0; i < response.data.length; i++) {
                // log each venue name, location, date

                var dateOfEvent = response.data[i].datetime
                var dateFormatted = moment().format("MM/DD/YYYY", dateOfEvent)


                console.log("-------------------------");
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.location);
                console.log("Date of Event: " + dateFormatted);

            }

            // venue location, 

            // date of event 
        });
}

function spotifyThisSong() {
    axios.get(spotifyURL)
        .then(function(response) {
            //log name of venue, venue location, date of event 
        });
}

function doWhatItSays() {
    axios.get(bandsURL)
        .then(function(response) {
            //log name of venue, venue location, date of event 
        });
}