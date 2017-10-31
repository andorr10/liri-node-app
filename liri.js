var request = require("request");
var fs = require("fs");



//twitter function
if (process.argv[2] === "my-tweets"){
  client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});
}




//spotify function




// OMDB API function
  // * Title of the movie.
  //  * Year the movie came out.
  //  * IMDB Rating of the movie.
  //  * Rotten Tomatoes Rating of the movie.
  //  * Country where the movie was produced.
  //  * Language of the movie.
  //  * Plot of the movie.
  //  * Actors in the movie.
var movieName = "";
if (process.argv[2] === "movie-this"){
  for (var i = 3; i < process.argv.length; i++) {
    if (i > 2 && i < process.argv.length) {
      movieName = movieName + "+" + process.argv[i];
    }
    else {
      movieName += proess.argv[i];
    }
  }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    //console.log(JSON.parse(body));
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings.Value);
    console.log("!!!! ERRORR!!!!! + Rotten Tomatoes rating: " + JSON.parse(body).Year);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  }
  });
}


// fs function needed for do-what-it says function
// var fs = require("fs");
// fs.readFile("./best_things_ever.txt", "utf8", function(error,data){
//   if(error){
//     console.log(error);
//   }
//   console.log("we found no error");
// });
