var app = app || {};

var newsList = app.newsList || new app.NewsList;
var categoryView = app.categoryView || new app.CategoryView;
var NewsView = app.NewsView;

app.Presenter = Backbone.View.extend({

    el: $(".detail-table-body"),

    initialize: function () {
        var _this = this;

        Backbone.on("getAllNews", function () {
            // Model
            var data = newsList.getAll();
            // View
            _this.render(data);
            // Nav
            categoryView.highlightByName();
        });

        Backbone.on("getNewsByCategory", function (category) {
            // Model
            var data = newsList.filterByCategory(category);
            // View
            _this.render(data);
            // Nav
            categoryView.highlightByName(category);
        });

        Backbone.on("getNewsByWebsite", function (site) {
            // Model
            var data = newsList.filterBySite(site);
            // View
            _this.render(data)
            // Nav
            categoryView.highlightByName();
        });
    },

    render: function (list) {
        var _this = this;
        this.$el.empty();
        list.forEach(function (info, index) {
            info.set("index", index); // 无法把index作为参数传入，Backbone.View只能识别model

            var newsView = new NewsView({
                model: info
            });

            _this.$el.append(newsView.el);
        });
    },

    initNewsList: function (data) {
        newsList.reset(data, { silent: true });
    }

});

app.presenter = new app.Presenter;