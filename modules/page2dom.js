/*
    HOW TO USE:
    page2dom.parse(pageArr, callback, options);

    1. pageArr: 想要抓取的url数组：
    [
        http://expamle1.com,
        http://expamle1.com,
        http://expamle1.com
    ]

    2. callback(url_and_body):
    处理抓取结果的函数, 传入参数为html片段数组：
    [
        body: "<html>...</html>",
        body: "<html>...</html>"
    ]
    
    TODO: 
    options = {
        async:
        timeout:
        repeat
    }

*/
var request = require('request');
var iconv = require('iconv');

var PAGE_COUNT = 0, // 请求url总个数，
    COMPLETE_COUNT = 0,
    _result = [];

var checkComplete = function () {
    if (!--COMPLETE_COUNT) {
        return true;
    }
    return false;
};


var fetch = function (url, callback) {

    request({
        'url': url,
        'encoding': "utf8",
        'headers': {
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'
        }
    }, function (err, response, body) {

        _result.push(body);

        if (checkComplete()) {
            callback(_result);
        }
    });
};

exports.parse = function (pageArr, callback, options) {

    _result = [];
    PAGE_COUNT = pageArr.length;
    COMPLETE_COUNT = PAGE_COUNT;

    pageArr.forEach(function (url) {
        fetch(url, callback);
    });
};