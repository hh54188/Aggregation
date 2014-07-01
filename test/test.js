/*
    Because involve timeout test and multiple site fetch,
    test need longer timeout:

    mocha test.js -t 20000
*/

var P2D = require("../modules/page2dom");

describe('URL', function () {
    /*
        Invalid URL TEST;
    */
    it ("should throw an error when url is invalid", function (done) {
        new P2D("ThisDomainShouldNotExist", function (err, $) {
            if (err) {
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
                done();
            }
        })
    });
});