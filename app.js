var express = require('express');
var FeedParser = require('./modules/feedparser');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));



app.get("/test", function (req, res) {
    var url = "http://127.0.0.1:8000/0.xml";
    FeedParser.parse(url, function (data) {
        res.send(data);
    });
})


app.listen(8000);