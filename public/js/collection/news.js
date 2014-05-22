var app = app || {};
var B = Backbone;

app.NewsList = Backbone.Collection.extend({
	model: app.News,
	url: "/news",
	comparator: function (model) {
		return -model.get("date");
	},
	initialize: function () {

	},
	getAll: function (ignoredSites) {
		var filterResult = this.filter(function (news) {
			var meta = news.get("meta");

			if (ignoredSites || ignoredSites.length) {
				for (var i = 0; i < ignoredSites.length; i++) {
					if (ignoredSites[i] == meta.id) {
						return false;
					}
				}
				return true;
			}
			return true;
		});
		return filterResult;
	},
	filterByCategory: function (category, ignoredSites) {

		if (category == "all") {
			return this.getAll(ignoredSites);
		}

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