var app = app || {};

var NewsList = Backbone.Collection.extend({
	model: app.News,
	url: '/news'
});