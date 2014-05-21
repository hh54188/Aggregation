var app = app || {};
var newsList = app.newsList || new app.NewsList;

$(".detail-table-more").click(function () {
	newsList.fetch({ 
		data: { 
			page: 1
		} 
	});
});