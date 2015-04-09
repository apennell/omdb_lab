var express = require("express"),
	request = require("request"),
	app = express();


app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/search", function (req, res) {
	var title = req.query.movieTitle;
	request('http://www.omdbapi.com/?s=' + title, function (err, response, body) {
		console.log(body);
    var results = JSON.parse(body);
    var searchResults = results.Search;
		res.render("search", {movieList: searchResults});
	});
});

var savedMovies = [];

app.get("/movie/:id", function (req, res) {
  var id = req.params.id;
  request('http://www.omdbapi.com/?i=' + id, function (err, response, body) {
    console.log(body);
    var movie = JSON.parse(body);
    res.render("show.ejs", {movieInfo: movie});
  });
});

app.post("/save", function (req, res) {
  var movie = req.params.movie;
  console.log("=========" + movie + "=========")
  savedMovies.push(movie);
  console.log("My saved movies" + savedMovies);
  res.render("save");
});

app.get('/save', function(req, res){
  var movies = savedMovies;
  console.log(movies);
  res.render('save.ejs', {movies: movies});
});


app.listen(3000, function () {
	console.log("Visit localhost:3000");
});