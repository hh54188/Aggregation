// RSS 2.0解析器

var parseString = require('xml2js').parseString;
var request = require('request');

var _parse = function (data) {
	var arr = [];

	var channels = data.rss.channel;
	channels.forEach(function (channel, index) {
		arr.push(channel);
	});

	return arr;
}

exports.parse = function (rssAddress, fn) {
	var result = null;
	request(rssAddress, function (error, response, body) {
		if (error) {
			fn(result);
			return;
		}

	    parseString(body, function (err, data) {
	        if (err) {
	        	fn(result);
	        	return;
	        }

	        fn(_parse(data));
	    });
	});
}
