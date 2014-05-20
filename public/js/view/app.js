var app = app || {};

var newsList = app.newsList || new app.NewsList;

app.Presenter = Backbone.View.extend({
	initialize: function () {
		Backbone.on("getNewsByCategory", function (category) {
			var data = newsList.filterByCategory(category); // Model
		});

		Backbone.on("getNewsByWebsite", function (site) {
			var data = newsList.filterBySite(site); // Model
		});
	},
	initNewsList: function (data) {
		newsList.reset(data, { silent: true });
		console.log(newsList);
	}
});

app.presenter = new app.Presenter;