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
    处理抓取结果的函数, 传入参数为对象数组：
    [
        {
            url: http://expamle1.com,
            body: "<html>...</html>"
        },
        {
            url: http://expamle2.com,
            body: "<html>...</html>"
        }
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
    DATA = [];

var checkComplete = function () {
    if (!--COMPLETE_COUNT) {
        return true;
    }
    return false;
};


var fetch = function (url, callback) {

    request({
        'url': url,
        'encoding': null,
        'headers': {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip,deflate,sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2,es;q=0.2',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Host':'www.douban.com',
            'Pragma':'no-cache',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'
        }
    }, function (err, response, body) {

        var ic = new iconv.Iconv('utf-8');
        var buf = ic.convert(body);
        var utf8String = buf.toString('utf-8');

        console.log(utf8String);

        DATA.push({
            url: url,
            body: body
        });

        if (checkComplete()) {
            callback(DATA);
        }
    });
};

exports.parse = function (pageArr, callback, options) {

    DATA = [];
    PAGE_COUNT = pageArr.length;
    COMPLETE_COUNT = PAGE_COUNT;

    pageArr.forEach(function (url) {
        fetch(url, callback);
    });
};