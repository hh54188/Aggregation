var app = app || {};

app.NewsView = Backbone.View.extend({

	tagName: "tr",

	template: _.template($('#news-template').html()),

	dateFormat: function (date) {
		var curTime = +new Date(); 
		var suffix = "前";

		var minutes = (curTime - date) / (60 * 1000);
		var hours = (curTime - date) / (60 * 60 * 1000);
		var days = Math.floor(hours / 24);

		if (minutes < 60) {
			return parseInt(minutes) + "分钟" + suffix;
		} else if (hours < 24) {
			return parseInt(hours) + "小时" + suffix;
		} else if (days >= 1 && days <= 7) {
			return days + "天" + suffix;
		} else if (days > 7) {
			return "一周" + suffix;
		}
	},

	render: function() {

    	this.$el.html(this.template(this.model.toJSON()));
    	this.$el.addClass(this.model.get("index") % 2 == 0? "even": "odd");

      	return this;
    },

	initialize: function () {
		this.model.set("countdown", this.dateFormat(this.model.get("date")));
		return this.render();
	}
});