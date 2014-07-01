var P2D = require("../modules/page2dom");

// new P2D("http://www.iqiyi.com").then(function ($) {
// 	debugger
// }, function (err) {
// 	debugger
// })


// new P2D("iqiyi.noexistdomain").then(function ($) {
// 	debugger
// }, function (err) {
// 	debugger
// })



new P2D("http://www.iqiyi.com", function (err, $) {
	debugger
});



// describe('Array', function () {
// 	it ("should work at least", function (done) {
// 		new P2DConstructor("iqiyi.wtf/", function (err, $) {
// 			if (err) {
// 				console.log(err);
// 				return;
// 			}
// 			// done();
// 		});
// 	})
// })