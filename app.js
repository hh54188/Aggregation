var express = require('express');
var FeedParser = require('feedparser');
var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

var app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

// request('http://www.huxiu.com/rss/0.xml', function (error, response, body) {
//     parseString(body, function (err, result) {
//         console.dir(result);
//     });
// });

fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parseString(data, function (err, result) {
        console.dir(result.person);
    });
});


app.listen(8000);