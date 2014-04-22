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

var isObject = function (tar) {
	return Object.prototype.toString.call(tar) == "[object Object]"? true: false;
};

var isEmptyObj = function (tar) {
	for (var key in tar) {
		return false;
	}

	return true;
};

exports.parse = function (arr_html, selector, selectorResultHandle) {

	var result = [];

	arr_html.forEach(function (html) {

		var $ = cheerio.load(html);
		var items = $(selector);
		var customAttrs = {};

		var format = items.map(function (index, item) {
			
			customAttrs = selectorResultHandle($(item));

			// 添加自定义属性
			if (isObject(customAttrs)) {
				return customAttrs;
			}
		});

		if (!isEmptyObj(format)) {
			result.push(format);
		}
	});

	return result;
};