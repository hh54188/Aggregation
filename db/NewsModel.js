var mongoose = require('mongoose');

NewsSchema = mongoose.Schema({
    title: String,
    url: String,
    hash: {
        type: [String],
        index: { unique: true }
    },
    date: {
        type: [Number],
        index: true
    },
    meta: {
        website: String,        // From which website
        aka: String,            // The website name
        id: String,
        icon: String,
        updateInterval: Number, // The time interval to update,
        category_code: String,
        category_name: String
    }
});

module.exports = mongoose.model('News', NewsSchema);