var mongoose = require('mongoose');
var NewsSchema = require("./NewsSchema");

var db;

var SKIP_NUM = 50,
    LIMIT_NUM = 50;

function connectToDB () {
    mongoose.connect('mongodb://localhost/test');
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('MongoDB connected!');
    });
}

function Operator() {
    connectToDB();
}

Operator.prototype.save = function (data) {
    data.forEach(function (item) {
        new NewsSchema(item).save(function (err, doc) {
            console.log("saved");
        });
    });
}

Operator.prototype.find = function (page) {
    page = page || 0;

    NewsSchema.find({}).sort({ 
        date: -1 
    }).skip(SKIP_NUM * page).limit(LIMIT_NUM).exec(function (err, docs) {
        console.log(err, docs.length);
    });
}

module.exports = Operator; // Exports Constructor Function 