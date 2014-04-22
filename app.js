var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000);

//-------------------------SERVER END

var page2dom = require("./modules/page2dom");
var dom2json = require("./modules/dom2json");


page2dom.parse([
    // "http://www.billboard.com/charts/hot-100?page=0",
    // "http://www.billboard.com/charts/hot-100?page=1",
    // "http://www.billboard.com/charts/hot-100?page=2",
    "http://www.douban.com/group/beijingzufang/discussion?start=50"
    // "http://tieba.baidu.com/f?kw=javascript&fr=ala0"
], function(arr_html) {

    dom2json.parse(arr_html, "#content tr", function($item) {

        var title = $item.find(".title a").text();
        // console.log(title);
        return {
            title: title
        };
    });
});