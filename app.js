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


app.get("/movie/:id", function (req, res) {
  var id = req.params.id;
  request('http://www.omdbapi.com/?i=' + id, function (err, response, body) {
    console.log(body);
    var movie = JSON.parse(body);
    res.render("show.ejs", {movieInfo: movie});
  });
});







app.listen(3000, function () {
	console.log("Visit localhost:3000");
});