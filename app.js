var express = require('express');
// var FeedParser = require('./modules/feedparser');
// var DomParser = require('./modules/domparser');
// var requestPages = require("./modules/requestPages");
var page2dom = require("./modules/page2dom");
var dom2json = require("./modules/dom2json");

var path = require('path');
var request = require('request');
var cheerio = require('cheerio');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));



page2dom.parse([
	// "http://www.billboard.com/charts/hot-100?page=0",
	// "http://www.billboard.com/charts/hot-100?page=1",
	// "http://www.billboard.com/charts/hot-100?page=2",
	"http://www.billboard.com/charts/hot-100?page=3"
], function (url_and_body) {

	var arr_html = url_and_body.map(function (item) {
		return item.body;
	});

	dom2json.parse(arr_html, "#block-system-main article", function ($item) {
		return {
			test: "true"
		}
	});
});

// requestPages.parse([
// 	"http://www.billboard.com/charts/hot-100?page=0",
// 	"http://www.billboard.com/charts/hot-100?page=1",
// 	"http://www.billboard.com/charts/hot-100?page=2",
// 	"http://www.billboard.com/charts/hot-100?page=3"
// ], 10, "#block-system-main article", {
// 	"id": {
// 		attr: "id"
// 	},
// 	"cover_src": {
// 		selector: "header .img-wrap img",
// 		attr: "src"
// 	}
// }, function (data) {
// 	console.log(data.length);
// });


// FeedParser.parse("http://www.boxofficemojo.com/data/rss.php?file=topstories.xml", function (data) {
// 	console.log(data);
// })



app.get("/test", function (req, res) {})


app.listen(8000);