/*
	using express 4.1.2
	http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
*/

// Globe Module
var express = require("express");
var ejs = require("ejs");

// Config & Test data:
var SampleData = require("./config/data");
var config = require("./config/config");

// Custom Module:
var helper = require("./modules/pageHelper");


// Server Config:
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// Route Config
app.get("/", function (req, res) {
	res.render("index", {
		list: SampleData,
		config: config,
		helper: helper
	});
});

app.get("/news", function (req, res) {

});

// Boot:
var app = express();
app.listen(8000);