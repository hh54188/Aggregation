var express = require('express');
var FeedParser = require('./modules/feedparser');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));





app.get("/test", function (req, res) {
    // RSS
    // var url = "http://www.yyets.com/rss/feed/";
    // FeedParser.parse(url, function (data) {
    //     res.send(data);
    // });

    var url = "http://www.slbook1996.com/book/allbang.htm";
    request(url, function (error, response, body) {
        var $ = cheerio.load(body);
        var links = $(".topbook ul li");

        var result = links.map(function (index, elem) {
            return $(elem).find("a").attr("href");
        })

        console.log(result);
        res.send(result);
    })
})


app.listen(8000);