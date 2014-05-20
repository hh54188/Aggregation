var newsList = app.newsList;

var NewsRoute = Backbone.Router.extend({
	routes: {
		"/": "getDefaultNews",
		"category/:name": "getNewsByCategory",
		"website/:name": "getNewsByWebsite"
	},
	getDefaultNews: function () {
		console.log("DEFAULT!");
		Backbone.trigger("getDefaultNews");
	},
	getNewsByCategory: function (category) {
		console.log(category);
		Backbone.trigger("getNewsByCategory", category);
	},
	getNewsByWebsite: function (website) {
		console.log(website);
		Backbone.trigger("getNewsByWebsite", website);
	}
});

var myRouter = new NewsRoute();

Backbone.history.start();