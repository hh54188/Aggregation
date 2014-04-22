var Convert = require("../modules/page2dom").Convert;
var dom2json = require("../modules/dom2json");
var Schedule = require("../modules/schedule").Schedule;


function selectorCallback($item) {

    var title = $item.find(".title a").text();
    var url = $item.find(".title a").attr("href");

    if (title && url) {
        return {
            title: title,
            url: url
        };
    }
    return {};
}


function request(rootURL) {

    var arr_url = [];

    for (var i = 0; i <= 1; i++) {
        arr_url.push(rootURL + "?start=" + i * 25);
    }

    new Convert(arr_url, function(arr_html) {
        var result = dom2json.parse(arr_html, "#content tr", selectorCallback);
        console.log("URL--->", rootURL);
        console.log("TASK--->", result);
    });
}


// 考虑到要请求多个(10)小组，每个小组10个页面
// 怕一次请求一百个页面会被豆瓣屏蔽IP
// 所以每隔1分钟请求一个小组
new Schedule(

    function() {
        request("http://www.douban.com/group/beijingzufang/discussion");
    },

    function() {
        request("http://www.douban.com/group/fangzi/discussion")
    }
)