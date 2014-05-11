var mongoose = require('mongoose');

NewsSchema = mongoose.Schema({
    title: String,
    url: String,
    hash: {
        type: [String],
        index: {
            unique: true
        }
    },
    timestamp: Number,          // The time create this news
    meta: {
        website: String,        // From which website
        aka: String,            // The website name
        updateInterval: Number  // The time interval to update
    }
});

module.exports = mongoose.model('News', NewsSchema);