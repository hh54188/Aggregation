var request = require('request');

var PAGE_COUNT = 0, // 请求url总个数，
	COMPLETE_COUNT = 0,
	ASYNC = false, // 是否等待所有url请求结果返回再调用回调函数，模式为是
	DATA = [];

var checkComplete = function () {
	if (!--COMPLETE_COUNT) {
		return true;
	}
	return false;
};


var fetch = function (url, callback) {

	request(url, function (err, response, body) {

		// 不做容错，即使返回error，也表示请求该url的任务完成

		// 如果异步调用回调函数，则每请求一次调用回调函数
		if (ASYNC) {
			callback({
				url: url,
				body: body
			});
		// 否则，等待所有结果返回后再调用回调函数
		} else {
			DATA.push({
				url: url,
				body: body
			});

			if (checkComplete()) {
				callback(DATA);
			}			
		}
	});	
};

exports.parse = function (pageArr, callback, options) {

	DATA = [];
	PAGE_COUNT = pageArr.length;
	COMPLETE_COUNT = PAGE_COUNT;

	var opt = options || {};
	ASYNC = opt.async || false;

	pageArr.forEach(function (url) {
		fetch(url, callback);
	});
};