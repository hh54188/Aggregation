var app = app || {};
var newsList = app.newsList;


var NewsRouter = Backbone.Router.extend({
	initialize: function () {

	},
	routes: {
		"category/:name": "getNewsByCategory",
		"*action": "getAllNews" // default route, match http://example.com/#anything-here
		// "website/:name": "getNewsByWebsite", 
		// 为什么不能按照网站名称过滤，因为在大分类的前提下，用户的需求更应该是“不看某些网站”，而不是“只看某个网站”
	},
	getAllNews: function () {
		Backbone.trigger("getAllNews");
	},
	getNewsByCategory: function (category) {
		Backbone.trigger("getNewsByCategory", category);
	}
});

app.newsRouter = new NewsRouter();

Backbone.history.start();