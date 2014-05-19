// Global Module:
var cheerio = require('cheerio');
var md5 = require('MD5');

var config = require("./config/config");      // Config
var Convert = require("./modules/page2dom");  // Scrapy
var Operator = require("./db/NewsOperator");  // DB Operate

// Local Variable:
var op = new Operator();


function siteCollector(site, category_code, category_name) {

    var url = site.website;
    var updateInterval = site.updateInterval;

    var meta = {
        url: url,
        id: site.id,
        icon: site.icon,
        name: site.aka,
        updateInterval: updateInterval,
        category_code: category_code,
        category_name: category_name
    };

    var selector = site.selector;

    new Convert(url, function(htmls) {
        var $ = cheerio.load(htmls[0]);
        selector.forEach(function (sel) {

            var titles,
                hrefs;

            var textSelector = sel.textSelector;
            var hrefSelector = sel.hrefSelector;

            titles = $(textSelector);
            hrefs = hrefSelector? $(hrefSelector).attr("href"): "";

            var result = titles.map(function (index, item) {
                item = $(item);

                var _title = item.text() || item.attr("title");
                var _url = item.attr("href") || hrefs[index];

                // In case of relative url
                if (!(/http|https/.test(_url))) {
                    _url = url + (/\/$/.test(url)? "": "/") + _url;
                }

                return {
                    title: _title,
                    url: _url,
                    hash: md5(meta.id + ":" + _title), //For checking if saved already (source:href)
                    date: +new Date(),
                    meta: meta
                };
            });
            // console.log(result);
            // op.save(result);
        });
    });
}

function allocateSchedule(task, interval) {
    task();
    setInterval(function () {
        task();
    }, interval * 60 * 1000);
}

for (var category_code in config) {

    var websites = config[category_code].websites;
    var category_code = category_code,
        category_name = config[category_code].aka;

    websites.forEach(function (site) {
        var interval = site.updateInterval || 10; //In minutes

        allocateSchedule(function () {
            siteCollector(site, category_code, category_name);
        }, interval);
    });
}