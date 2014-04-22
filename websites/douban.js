var Convert = require("../modules/page2dom").Convert;
var dom2json = require("../modules/dom2json");

var arr_url = [
    "http://www.douban.com/group/beijingzufang/discussion?start=50"
];

new Convert(arr_url, function (arr_html) {

    var result = dom2json.parse(arr_html, "#content tr", function ($item) {

        var title = $item.find(".title a").text();
        var url = $item.find(".title a").attr("href");

        return {
            title: title,
            url: url
        };
    });

    console.log(result);
});