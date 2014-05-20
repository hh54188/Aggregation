/*
	using express 4.1.2
	http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
*/

// Globe Module
var express = require("express");
var ejs = require("ejs");
ejs.open = '{{';
ejs.close = '}}';

// Config & Test data:
var SampleData = require("./config/data");
var config = require("./config/config");

// Custom Module:
var helper = require("./modules/pageHelper");

// Boot:
var app = express();

// Server Config:
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// function convert2website(config) {
// 	var result = [];
// 	for (var category_code in config) {
// 		var category = config[category_code];
// 		var category_name = category.aka;
// 		var websites = category.websites;
// 		websites.forEach(function (site, index) {
// 			result.push({
// 				url: site.website,
// 				id: site.id,
// 				icon: site.icon
// 			})
// 		})
// 	}
// }


// Route Config
app.get("/", function (req, res) {
	res.render("index", {
		list: SampleData,
		config: config,
		helper: helper
	});
});

app.get("/news", function (req, res) {

});

app.listen(8000);