
var request = require('request');
var cheerio = require('cheerio');

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) == "[object Array]"? true: false;
}

var isString = function (obj) {
    return Object.prototype.toString.call(obj) == "[object String]"? true: false;    
}


var defaultRequestOpts = {
    'encoding': "utf8",
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:33.0) Gecko/20100101 Firefox/33.0'
    }
};


var mixin = function (defaultObj, customObj) {
    var result = {};

    for (var key in defaultObj) {
        result[key] = defaultObj[key];
        result[key] = customObj[key];
    }

    return result;
}

/*
    fn(urlArr, cb)
    fn(urlArr, requestOptions, cb)
    fn(urlArr, selector, cb);
    fn(urlArr, requestOptions, selector, cb);
*/
function ConstructFn(urlArr, requestOptions, selector, callback) {

    var args = arguments;
    if (!isArray(urlArr)) urlArr = [urlArr];

    this.urlArr = urlArr;
    this.requestOptions = {};
    this.selector = null;
    this.callback = new Function();

    if (args.length === 2) {

        this.callback = args[1];

    } else if (args.length === 3) {

        isString(args[1])? 
            this.selector = args[1]: 
            this.requestOptions = mixin(defaultRequestOpts, args[1]);

        this.callback = args[2];

    } else if (args.length === 4){

        this.requestOptions = mixin(defaultRequestOpts, requestOptions);
        this.selector = selector;
        this.callback = callback;
    }

    this.startFetch();
}


ConstructFn.prototype.startFetch = function() {

    var _this = this;
        _this.complete_count = this.urlArr.length;

    this.urlArr.forEach(function(url) {
        _this._fetch(url);
    });
};


ConstructFn.prototype._checkComplete = function() {
    if (!--this.complete_count) {
        return true;
    }
    return false;
};


ConstructFn.prototype._fetch = function(url) {

    var _this = this;
    this.requestOptions.url = url;
    this.result = this.result || {};

    request(this.requestOptions, function(err, response, body) {

        if (err) {
            _this.callback(err, null);
        }

        var $ = cheerio.load(body);
        var result = $;

        if (_this.selector) {
            result = $(_this.selector).map(function (index, item) {
                return $(item);
            });
        }

        _this.result[url] = result;

        if (_this._checkComplete()) {
            _this.callback(null, _this.result);
        }        
    });
};

module.exports = ConstructFn;