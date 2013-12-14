var express = require('express');
var FeedParser = require('./modules/feedparser');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get("/test", function (req, res) {
    FeedParser.parse("http://www.huxiu.com/rss/0.xml", function (data) {
        res.send(data);
    });
})


app.listen(8000);