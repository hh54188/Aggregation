var app = app || {};

app.NewsList = Backbone.Collection.extend({
	model: app.News,
	url: '/news',
	filterByCategory: function (category) {
		var filterResult = this.filter(function (news) {
			return news.get("meta").category_code == category;
		});
		return filterResult;
	},
	filterBySite: function (site) {
		var filterResult = this.filter(function (news) {
			return news.get("meta").id == site;
		});
		return filterResult;
	}
});

app.newsList = new app.NewsList;