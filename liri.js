var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var key = require("./key");
var twitter = require("twitter");

function chooseCommand(){
if (command === "do-what-it-says"){
  doWhatItSays();
}
if (command === "my-tweets"){
  tweetIt();
}
if (command === "spotify-this-song"){
  spotifyIt();
}
if (command === "movie-this"){
  omdbFunction();
}
}


//twitter function
function tweetIt() {
  var client = new twitter(key.twitterKeys);
  var params = {screen_name: "andrewtestapi10", count: 15};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if(error) throw error;
  for (var i = 0; i < params.count; i++){
  console.log("On: " + tweets[i].created_at + "\n" + "You tweeted: " + tweets[i].text + "\n");
  //console.log("You Tweeted: " + tweets[i].text + "\n");  <--decided not to use this and combine above
  }
});
}
//__________-----------____________------------____________------------_____________-----------
//spotify function
// Client ID
// b2095ad3690f4425bfbfc25a14f05a98
// Client Secret
// 1f80a3d46ccd4a85adf34a5be89a36bd
// var spotify = new Spotify({
//   id: "b2095ad3690f4425bfbfc25a14f05a98",
//   secret: "1f80a3d46ccd4a85adf34a5be89a36bd"
// });

function spotifyIt() {
var client = new Spotify(key.spotifyKeys);
var songSearch = "";
for (var i = 3; i < process.argv.length; i++) {
  if (i > 2 && i < process.argv.length) {
    songSearch = songSearch + "+" + process.argv[i];
  }
}
//console.log(songSearch);
  // else {
  //   songSearch += proess.argv[i];
  // }
//__________-----------____________------------____________------------_____________
client.search({ type: 'track', query: songSearch }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null ,2));
    console.log("Artist Name: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null ,2));
    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null ,2));
    console.log("Link to preview: " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null ,2));

});

//__________-----------____________------------____________------------_____________

  // client.search({
  //    type: 'track', query: songSearch, limit: 5
  // }
  // ).then(
  //   function(response){
  //     //console.log(response);
  //     console.log(JSON.stringify(response, null , 2));
  //   }
  // ).catch(function(err) {
  //   console.log('Error occurred: ' + err);
  //   //console.log(data);
  //   }
  // );

// console.log("artist: ");
// console.log("Song Name: ");
// console.log("Preview: ");
// console.log("Album: ");
}

//__________-----------____________------------____________------------_____________-----------
// OMDB API function
  //  * IMDB Rating of the movie.
  //  * Rotten Tomatoes Rating of the movie.


function omdbFunction() {
  var movieName = "";
  for (var i = 3; i < process.argv.length; i++) {
    if (i > 2 && i < process.argv.length) {
      movieName = movieName + "+" + process.argv[i];
    }
    else {
      movieName += process.argv[i];
    }
  }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//console.log(movieName);
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(JSON.parse(body));
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    if(JSON.parse(body).Ratings[1]){
    console.log("Rotten Tomatoe Ranking " + JSON.parse(body).Ratings[1].Value);
    }
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
  else {
    console.log("there was an error with pulling your request");
  }
  });
}
//__________-----------____________------------____________------------_____________-----------
// fs function needed for do-what-it says function
//var command = process.argv[2];
//var d = process.argv[3];
function doWhatItSays(){
fs.readFile("./random.txt", "utf8", function(error,data){
  if(error){
    console.log(error);
  }
  else{
    var dataArray = data.split(",");
    //console.log(dataArray);
    command = dataArray[0];
    //console.log(command);
    process.argv[3] = dataArray[1];
    //console.log(process.argv[3]);
    chooseCommand();
  }
  });
}

chooseCommand();
