/*
    Because involve timeout test and multiple site fetch,
    test need longer timeout:

    mocha test.js -t 20000
*/

var P2D = require("../modules/page2dom");
var request = require("request");

describe("Basic function", function (done) {
    it ("should ouput cheerio wrapped body to callback when no selector specified", function (done) {
        new P2D("http://www.baidu.com", function (err, $) {
            if (err) {
                return;
            }

            request({
                url: "http://www.baidu.com"
            }, function(err, response, body) {
                var tmp1 = $["http://www.baidu.com"].html();
                debugger
            })
        });
    });
});

describe('URL', function () {
    /*
        Invalid URL TEST;
    */
    it ("should throw an error when url is invalid", function (done) {
        new P2D("ThisDomainShouldNotExist", function (err, $) {
            if (err) {
                done();
            }
        });
    });

    /*
        Invalid URL TEST(without protocal);
    */
    it ("should throw an error without 'http' prefix", function (done) {
        new P2D("www.baidu.com", function (err, $) {
            if (err) {
                done();
            }
        });
    });

    /*
        Valid URL TEST
    */
    it ("should passed when single url is vaild", function (done) {
        new P2D("http://www.baidu.com", function (err, $) {
            if (err) {
                return;
            }
            done();
        });
    });

    /*
        Multiple valid URL TEST
    */
    it ("should passed when multiple urls is vaild", function (done) {
        new P2D([
            "http://www.baidu.com", 
            "http://www.renren.com",
            "http://weibo.com"], function (err, $) {
            if (err) {
                return;
            }
            done();
        });
    });

    /*
        Multiple invalid URL TEST
    */
    it ("should throw an error when one of multiple urls is invalid", function (done) {
        new P2D([
            "http://www.baidu.com", 
            "ThisDomainShouldNotExist",
            "http://www.renren.com"], function (err, $) {
            if (err) {
                done();
            }
        });
    });    

    /*
        Request timeout TEST
    */
    it ("should throw an error when request timeout", function (done) {
        new P2D("http://www.facebook.com", {
            timeout: 3000
        }, function (err, $) {
            if (err) {
                done();
            }
        })
    });
});

describe("Promises/A+", function () {

    it ("should be rejected when an error throw", function (done) {
        new P2D("ThisDomainShouldNotExist").then(function (result) {

        }, function (err) {
            if (err) {
                done();
            }
        });
    });

    it ("should be resolved when single URI requested successed", function (done) {
        new P2D("http://www.baidu.com").then(function (result) {
            done();
        }, function (err) {

        });
    });

    it ("should be resolved when multiple URIs requested successed", function (done) {
        new P2D([
            "http://www.baidu.com",
            "http://www.renren.com",
            "http://weibo.com"
        ]).then(function (result) {
            done();
        }, function (err) {

        });
    });    

    it ("should not be resolved when callback passed in", function (done) {
        new P2D("http://www.baidu.com", function (err, $) {
            if (err) return;
            done();
        }).then(function (result) {

        }, function (err) {

        });
    });    
});