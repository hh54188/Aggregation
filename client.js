var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.listen(8000);