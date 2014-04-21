var cheerio = require('cheerio');

exports.parse = function (arr_html, selector, each_callback) {

	arr_html.forEach(function (html) {
		var $ = cheerio.load(html);
		var items = $(selector);

		var arr = items.map(function (index, item) {
			var obj = each_callback(item);

			for (var key in obj) {
				item.attribs[key] = obj[key];
			}

			return item.attribs;
		});

		console.log(arr);

		each_callback(items);
	});
};