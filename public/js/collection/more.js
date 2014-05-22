var app = app || {};
var B = Backbone;

app.MoreList = B.Collection.extend({
	model: app.News,
	url: "/news",
	// Custom variable:
	currentPage: 1,
	tempCollection: [],
	initialize: function () {
		
	},
	fetchByPage: function (page, callback) {
		this.fetch({
			data: {
				page: page
			},
			success: function (collection, response, options) {
				if (callback) callback(collection);
			}
		});		
	},
	next: function (last) {
		this.last = last;

	},
	fetchNext: function () {

	},
	fetchLatest: function (page) {
		var _this = this;

		this.fetchByPage(page, function (collection) {

			var count = 0, 
				matched = false, 
				firstHash = this.first.hash || ;

			for (var i = collection.length - 1; i >= 0; i--) {
				count++;
				if (collection[i].hash == firstHash) {
					matched = true;
					break;
				}
			}


			if (!matched) { 

			} else {

			}

		});
	},
	latest: function (first) {
		var _this = this;
		this.first = first;
		this.fetchLatest();
	}
});

app.moreList = new app.MoreList;