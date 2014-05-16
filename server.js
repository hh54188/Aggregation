/*
	using express 4.1.2
	http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
*/

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

var data = [
	{
        title: "测试1",
        url: "www.gamersky.com",
        hash: "asdasdafasfasf",
        date: 1400221500789,
        meta: {
            website: "http://gamersky.com",
            aka: "游民星空",
            updateInterval: "10",
            category_code: "game",
            category_name: "游戏"
        }
	},
	{
        title: "测试2",
        url: "tech2ipo",
        hash: "asdafasfdgdggd",
        date: 1400221494566,
        meta: {
            website: "http://tech2ipo.com",
            aka: "tech2ipo",
            updateInterval: "10",
            category_code: "tech",
            category_name: "科技"
        }
	},
	{
        title: "测试3",
        url: "http://www.iqiyi.com",
        hash: "hhkjkjkjkjkj",
        date: 1400221241011,
        meta: {
            website: "http://www.iqiyi.com",
            aka: "爱奇艺",
            updateInterval: "20",
            category_code: "funny",
            category_name: "搞笑"
        }			
	}
]

app.get("/news", function (req, res) {
	res.send(data);
});

app.listen(8000);