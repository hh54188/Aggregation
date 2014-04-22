/*
    抓取页面，存储html为字符串

    HOW TO USE:
    page2dom.parse(pageArr, callback, options);


    PARAMETERS:
    1. pageArr: 想要抓取的url数组：
    [
        http://expamle1.com,
        http://expamle1.com,
        http://expamle1.com
    ]

    2. callback(arr_body):
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

function ConvertConstructFn(pageArr, callback) {

    this._pageArr = pageArr;
    this._callback = callback;

    this.startFetch();
}

// 暴露此接口用于多次调用
ConvertConstructFn.prototype.startFetch = function() {

    var _this = this,
        pageArr = this._pageArr,
        callback = this._callback;

    this.result = [];
    this.complete_count = pageArr.length;

    pageArr.forEach(function(url) {
        _this._fetch(url, callback);
    });
};


ConvertConstructFn.prototype._checkComplete = function() {
    if (!--this.complete_count) {
        return true;
    }
    return false;
};


ConvertConstructFn.prototype._fetch = function(url, callback) {
    var _this = this;

    request({
        'url': url,
        'encoding': "utf8",
        'headers': {
            // 豆瓣屏蔽了抓取，需要提供user-agent
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:31.0) Gecko/20100101 Firefox/31.0'
        }
    }, function(err, response, body) {

        _this.result.push(body);

        if (_this._checkComplete()) {
            callback(_this.result);
        }
    });
};

module.exports = {
    Convert: ConvertConstructFn
};