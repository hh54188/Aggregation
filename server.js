var cheerio = require('cheerio');
var md5 = require('MD5');
var Convert = require("./modules/page2dom").Convert;
var config = require("./config/config");

function siteCollector(site) {

    var url = site.website;
    var name = site.aka;
    var updateInterval = site.updateInterval;

    var meta = {
        url: url,
        name: name,
        updateInterval: updateInterval
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
                var _href = item.attr("href") || hrefs[index];

                // In case of relative url
                if (!(/http|https/.test(_href))) {
                    _href = url + (/\/$/.test(url)? "": "/") + _href;
                }

                return {
                    title: _title,
                    href: _href,
                    hash: md5(_title + meta.url), 
                    //For checking if saved already (source:href)
                    timestamp: +new Date(),
                    meta: meta
                };
            });
        });
    });
}

function allocateSchedule(task, interval) {
    task();
    setTimeout(function () {
        task();
    }, interval);
}

for (var category in config) {
    var websites = config[category];
    websites.forEach(function (site) {
        var interval = site.updateInterval || 10; //In minutes
        allocateSchedule(function () {
            siteCollector(site, interval);
        });
    });
}