var express = require('express');
var FeedParser = require('./modules/feedparser');
var DomParser = require('./modules/domparser');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));



var url = "http://www.slbook1996.com/book/allbang.htm";
request(url, function (error, response, body) {
    DomParser.parse(body, ".topbook ul li", {
        link: {
            selector: "a",
            attr: "href"
        }
    })
})



app.get("/test", function (req, res) {})


app.listen(8000);