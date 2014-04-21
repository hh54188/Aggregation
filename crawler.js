var Crawler = require("crawler").Crawler;

var c = new Crawler({
    "callback": function(error, result, $) {
        console.log($('body'));
    }
});

c.queue("http://www.baidu.com");