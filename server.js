/*
	using express 4.1.2
	http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
*/

var express = require("express");
var SampleData = require("./config/data");
var config = require("./config/config");

var app = express();

app.use(express.static(__dirname + '/public'));


app.get("/news", function (req, res) {
	res.send(data);
});

app.listen(8000);