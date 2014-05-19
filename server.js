/*
	using express 4.1.2
	http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
*/

var express = require("express");
var ejs = require("ejs");

var SampleData = require("./config/data");
var config = require("./config/config");


var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var dateFormat = function (date) {

	var curTime = +new Date(); 
	var suffix = "前";

	var minutes = (curTime - date) / (60 * 1000);
	var hours = (curTime - date) / (60 * 60 * 1000);
	var days = Math.floor(hours / 24);

	if (minutes < 60) {
		return minutes + "分钟" + suffix;
	} else if (hours < 24) {
		return hours + "小时" + suffix;
	} else if (days >= 1 && days <= 7) {
		return days + "天" + suffix;
	} else if (days > 7) {
		return "一周" + suffix;
	}	
}

app.get("/", function (req, res) {
	res.render("index", {
		list: SampleData,
		dateFormat: dateFormat
	});
});

app.get("/news", function (req, res) {

});

app.listen(8000);