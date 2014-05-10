var express = require('express');
var path = require('path');
var DB = require('./modules/db');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

DB.connectToDB(DB.init);



app.get('/', function(req, res) {
    DB.find(function(doc) {
        var total = 1000;
        var count = 0;

        // for (var i = 0; i < total; i++) {

        // }
        // for (var item in doc) {
        //     if (++count > total) return;
        //     console.log(doc[item]);
        // }
        // res.render('index.ejs', {
        //     data: doc
        // });
    });
});

app.listen(8000);