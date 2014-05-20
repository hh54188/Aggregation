var app = app || {};

// Instances:
var newsList = app.newsList || new app.NewsList;
var categoryView = app.categoryView || new app.CategoryView;
// Class
var NewsView = app.NewsView;
// Config:
var Config = app.config || new app.AppConfig;

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
            // Store in config:
            Config.setCurCategory();
        });

        Backbone.on("getNewsByCategory", function (category) {
            debugger
            // Model
            var data = newsList.filterByCategory(category);
            // View
            _this.render(data);
            // Nav
            categoryView.highlightByName(category);
            // Store in config:
            Config.setCurCategory(category);
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