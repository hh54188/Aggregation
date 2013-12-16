// 从dom中提取信息，转化为JSON格式

var cheerio = require('cheerio');
/*
	props: {
		name: {
			selector: null,
			attr: ""
		}
	}
*/
exports.parse = function (html, item_selector, props) {

	var $ = cheerio.load(html);

	var items = $(item_selector);

	var items2json = items.map(function (index, elem) {
		var temp = {};
		elem = $(elem);
		for (var name in props) {
			var prop = props[name];
			temp[name] = prop.selector? 
						elem.find(prop.selector).attr(prop.attr): 
						elem.attr(prop.attr);
		}

		return temp;
	});

	console.log(items2json.length);
}