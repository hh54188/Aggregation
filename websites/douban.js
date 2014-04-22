var Convert = require("../modules/page2dom").Convert;
var dom2json = require("../modules/dom2json");

var arr_url = [];



var rootURL = "http://www.douban.com/group/beijingzufang/discussion";
for (var i = 0; i <= 1; i++) {
    arr_url.push(rootURL += "?start=" + i * 25);
}



new Convert(arr_url, function(arr_html) {

    var result = dom2json.parse(arr_html, "#content tr", function($item) {

        var title = $item.find(".title a").text();
        var url = $item.find(".title a").attr("href");

        if (title && url) {
            return {
                title: title,
                url: url
            };
        }

        return {};
    });

    console.log(result);
});