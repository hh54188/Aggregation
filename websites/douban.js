var Convert = require("../modules/page2dom").Convert;
var dom2json = require("../modules/dom2json");
var Schedule = require("../modules/schedule").Schedule;
var DB = require("../modules/db");

DB.connectToDB(DB.init);


function selectorCallback($item) {

    var title = $item.find(".title a").text();
    var url = $item.find(".title a").attr("href");

    if (title && url) {
        return {
            title: title,
            href: url
        };
    }
    return {};
}


function request(rootURL) {

    var arr_url = [];

    for (var i = 0; i <= 10; i++) {
        arr_url.push(rootURL + "?start=" + i * 25);
    }

    new Convert(arr_url, function(arr_html) {
        var result = dom2json.parse(arr_html, "#content tr", selectorCallback);
        DB.saveAll(result);
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
    },

    function() {
        request("http://www.douban.com/group/262626/discussion")
    },

    function() {
        request("http://www.douban.com/group/276176/discussion")
    },

    function() {
        request("http://www.douban.com/group/26926/discussion")
    },

    function() {
        request("http://www.douban.com/group/sweethome/discussion")
    },

    function() {
        request("http://www.douban.com/group/242806/discussion")
    },

    function() {
        request("http://www.douban.com/group/257523/discussion")
    },

    function() {
        request("http://www.douban.com/group/279962/discussion")
    },

    function() {
        request("http://www.douban.com/group/334449/discussion")
    }
)

setTimeout(function() {
    new Schedule(

        function() {
            request("http://www.douban.com/group/beijingzufang/discussion");
        },

        function() {
            request("http://www.douban.com/group/fangzi/discussion")
        },

        function() {
            request("http://www.douban.com/group/262626/discussion")
        },

        function() {
            request("http://www.douban.com/group/276176/discussion")
        },

        function() {
            request("http://www.douban.com/group/26926/discussion")
        },

        function() {
            request("http://www.douban.com/group/sweethome/discussion")
        },

        function() {
            request("http://www.douban.com/group/242806/discussion")
        },

        function() {
            request("http://www.douban.com/group/257523/discussion")
        },

        function() {
            request("http://www.douban.com/group/279962/discussion")
        },

        function() {
            request("http://www.douban.com/group/334449/discussion")
        }
    )
}, 60 * 11 * 1000);