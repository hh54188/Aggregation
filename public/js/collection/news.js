var app = app || {};

app.NewsList = Backbone.Collection.extend({
	model: app.News,
	url: '/news',

	getAll: function () {
		return this;
	},

	filterByCategory: function (category) {
		var filterResult = this.filter(function (news) {
			return news.get("meta").category_code == category;
		});
		return filterResult;
	}
});

app.newsList = new app.NewsList;