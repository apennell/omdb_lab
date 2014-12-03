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
		res.send(body);
	});
});

app.listen(3000, function () {
	console.log("Visit localhost:3000");
});