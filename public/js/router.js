var app = app || {};
var newsList = app.newsList;


var NewsRouter = Backbone.Router.extend({
	initialize: function () {

	},
	routes: {
		"category/:name": "getNewsByCategory",
		"website/:name": "getNewsByWebsite",
		"*action": "getAllNews" // default route, match http://example.com/#anything-here
	},
	getAllNews: function () {
		Backbone.trigger("getAllNews");
	},
	getNewsByCategory: function (category) {
		Backbone.trigger("getNewsByCategory", category);
	},
	getNewsByWebsite: function (website) {
		Backbone.trigger("getNewsByWebsite", website);
	}
});

app.newsRouter = new NewsRouter();

Backbone.history.start();