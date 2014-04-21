/*
	HOW TO USE:
	page2dom.parse(arr_html, selector, selector_result_handle)
	
	RETURN:
	[
		{
			tagName: "div",
			class: "",
			id: ""
		},
		{
			tagName: "div",
			class: "",
			id: ""
		}		
	]


	1. arr_html:
	需要进行jquery选择页面数组
	["<html>...</html>", "<html>...</html>", "<html>...</html>"]

	2. selector:
	你想选择元素的选择器

	3. selector_result_handle
	对选出来的每个html片段再处理，用于自定义添加属性
	比如判断片段中是否有图片

*/
var cheerio = require('cheerio');
var result = [];

exports.parse = function (arr_html, selector, selector_result_handle) {

	arr_html.forEach(function (html) {
		var $ = cheerio.load(html);
		var items = $(selector);

		var temp = items.map(function (index, item) {
			console.log($(item).find(".threadlist_title").text());

			var obj = selector_result_handle($(item));

			for (var key in obj) {
				item.attribs[key] = obj[key];
			}

			item.attribs.tagName = item.name;

			return item.attribs;
		});

		result.push(temp);
	});

	return result;
};