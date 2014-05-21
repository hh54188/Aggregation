var app = app || {};

app.NewsList = Backbone.Collection.extend({
	model: app.News,
	url: '/news',

	getAll: function () {
		return this;
	},

	filterByCategory: function (category, ignoredSites) {
		var filterResult = this.filter(function (news) {
			var meta = news.get("meta");

			if (ignoredSites || ignoredSites.length) {
				if (meta.category_code == category) {
					for (var i = 0; i < ignoredSites.length; i++) {
						if (ignoredSites[i] == meta.id) {
							return false;
						}
					}
					return true;
				}
			}
			return meta.category_code == category;
		});

		return filterResult;
	}
});

app.newsList = new app.NewsList;