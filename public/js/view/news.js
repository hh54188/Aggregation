var app = app || {};

app.NewsView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($('#news-template').html()),
	render: function() {
    	this.$el.html(this.template(this.model.toJSON()));
    	this.$el.addClass(this.index % 2 == 0? "even": "odd");
      	return this;
    },
	initialize: function () {
		return this.render();
	}
});