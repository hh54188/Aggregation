var app = app || {};
var B = Backbone;

app.CategoryView = B.View.extend({
	el: $(".category"),

	highlight: function (target) {
		this.items.removeClass("selected");
		$(target).addClass("selected");
	},

	initialize: function () {
		this.items = this.$el.find(".category-section-item");
	},
	
	// external API
	highlightByName: function (name) {
		name = name || "all";
		var target = this.$el.find('[data-category="' + name + '"]');
		this.highlight(target);
	}

})

app.categoryView = new app.CategoryView;