var app = app || {};
var B = Backbone;

app.SiteView = B.View.extend({
	el: $(".filter"),
	events: {
		"click .filter-section-item-watched": "checkboxClick"
	},
	checkboxClick: function (e) {
		var target = e.target || e.srcElement,
			target = $(target);
		var siteId = target.attr("data-site");

		$(target).is(":checked")?
			B.trigger("removeIgnoreSite", siteId):
			B.trigger("addIgnoreSite", siteId);
	},
	initialize: function () {
		this.items = this.$el.find(".filter-section-item");
	},
	// external API:
	showSitesByCategory: function (category) {
		if (!category) {
			this.items.show();
			return;
		}

		this.items.hide();
		this.$el.find(".filter-section-item[data-category=" + category + "]").show();
	}
});

app.siteView = new app.SiteView;