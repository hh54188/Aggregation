var app = app || {};

var newsList = app.newsList || new app.NewsList;
var NewsView = app.NewsView;

app.Presenter = Backbone.View.extend({

    el: $(".detail-table-body"),

    initialize: function () {
        var _this = this;

        Backbone.on("getNewsByCategory", function (category) {
            // Model
            var data = newsList.filterByCategory(category);
            // View
            _this.render(data)
        });

        Backbone.on("getNewsByWebsite", function (site) {
            // Model
            var data = newsList.filterBySite(site);
            // View
            _this.render(data)          
        });
    },

    render: function (list) {
        var _this = this;
        this.$el.empty();
        list.forEach(function (info, index) {
            var newsView = new NewsView({
                model: info,
                index: index
            });
            _this.$el.append(newsView.el);
        });
    },

    initNewsList: function (data) {
        newsList.reset(data, { silent: true });
    }

});

app.presenter = new app.Presenter;