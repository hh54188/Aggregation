var DomParser = require("./domparser");
var request = require('request');

var count = 0;
var result = [];
var callback;

var arrayIsFull = function (arr) {
	for (var i = 0; i < arr.length; i++) {
		if (!arr[i]) return false;
	}

	return true;
}

var checkComplete = function (data) {
	data.forEach(function (item) {
		result.push(item);
		count--;
	});

	if (!count) {
		callback(result);
	}
}

/*
	How to use:
	requestPages.parse([
		"http://www.billboard.com/charts/hot-100?page=0",
	], 10, "#block-system-main article", {
		"id": {
			attr: "id"
		}
	}, function (data) {
		console.log(data.length);
	})
*/


exports.parse = function (pageArr, numPerPage, item_selector, props, fn) {
	callback = fn;
	count = pageArr.length * numPerPage;

	pageArr.forEach(function (url, index) {
		request(url, function (err, response, body) {
			DomParser.parse(body, item_selector, props, checkComplete);
		});
	})
}