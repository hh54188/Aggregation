// RSS 2.0解析器

var parseString = require('xml2js').parseString;
var request = require('request');

var isArray = function (arr) {
    if (Object.prototype.toString.call(arr) == "[object Array]") {
        return true;
    }
    return false;
}

var isObject = function (obj) {
    if (Object.prototype.toString.call(obj) == "[object Object]") {
        return true;
    }
    return false;
}

var filterArray = function (arr) {
    arr.forEach(function (item) {
        if (isObject(item)) {
            filterObj(item);
        }
    })
}

var filterObj = function (obj) {

    for (var prop in obj) {
        var val = obj[prop];
        if (isArray(val) && val.length == 1){
            val = obj[prop] = val[0];

            if (isObject(val)) {
                filterObj(val);
            }
        } else if (isArray(val)) {
            filterArray(val);
        }
    }

    return obj;
}

// 因为xml2js转换的结果大部分是数组
// 所以要去数组
var _parse = function (data) {
    var arr = [];

    // 可能有多个频道
    var channels = data.rss.channel;
    channels.forEach(function (channel, index) {
        arr.push(filterObj(channel));
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
