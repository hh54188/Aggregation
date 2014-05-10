var mongoose = require('mongoose');
var md5 = require('MD5');

//connect to mongo
exports.connectToDB = function(callback) {
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('MongoDB connected!');
        if (callback) {
            callback();
        }
    });
};

var ItemSchema, ItemModel;

exports.saveAll = function(dataArr) {

    var notCompleteLen = dataArr.length;
    var errLength = 0,
        saveLength = 0;
    dataArr.forEach(function(data, index) {

        var item = new ItemModel({
            url: data.href,
            title: data.title,
            id: md5(data.href + Math.random())
        }).save(function(err) {
            if (!--notCompleteLen) {
                console.log(errLength + " ignored!");
                console.log(saveLength + " saved!");
            }

            if (err) {
                errLength++;
                return;
            }

            saveLength++;
        });

    })
}

exports.find = function(fn) {
    ItemModel.find({}, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        fn(doc);
    })
}

exports.init = function() {
    ItemSchema = mongoose.Schema({
        url: String,
        title: String,
        id: {
            type: [String],
            index: {
                unique: true
            }
        }
    });

    ItemModel = mongoose.model("MasterHouse", ItemSchema);
    console.log("Master init complete!");
};