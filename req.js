var request = require('request');
// var Buffer = require('buffer').Buffer;
// var Iconv = require('iconv').Iconv;

// var url = "http://www.baidu.com";
var url = "http://www.douban.com/group/beijingzufang/discussion?start=50";
// var url = "http://tieba.baidu.com/f?kw=%E5%91%A8%E6%9D%B0%E4%BC%A6&ie=utf-8&fr=wwwt";
// var url = "http://www.douban.com";


request({
    'url': url,
    'encoding': "ISO-8859-1",
    'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2,es;q=0.2',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Host': 'www.douban.com',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'
    }
}, function(err, response, body) {
    // console.log(body.toString("ISO-8859-1"));
    console.log(body);
})