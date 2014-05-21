var app = app || {};

// Collection/Views Instances:
var newsList = app.newsList || new app.NewsList;
var categoryView = app.categoryView || new app.CategoryView;
var siteView = app.siteView || new app.SiteView;
// Class
var NewsView = app.NewsView;
// Config:
var Config = app.config || new app.AppConfig;

app.Presenter = Backbone.View.extend({

    el: $(".detail-table-body"),

    initialize: function () {
        var _this = this;
        var data, previous;

        Backbone.on("getAllNews", function () {
            // restore config from
            var ignoredSites = Config.getIgnoredSites();
            // Model
            data = newsList.getAll(ignoredSites);
            // View
            _this.render(data);
            // Nav
            categoryView.highlightByName();
            siteView.showSitesByCategory();
            // Store in config:
            Config.setCurCategory();
        });

        Backbone.on("getNewsByCategory", function (category) {
            // Get ignored websites:
            var ignoredSites = Config.getIgnoredSites();
            // Model
            data = newsList.filterByCategory(category, ignoredSites);
            // View
            _this.render(data);
            // Nav
            categoryView.highlightByName(category);
            siteView.showSitesByCategory(category);
            // Store in config:
            Config.setCurCategory(category);
        });

        Backbone.on("removeIgnoreSite", function (siteId) {
            // restore from config
            var ignoredSites = Config.removeIgnoredSite(siteId);
            var curCategory = Config.getCurCategory();
            // Model
            data = newsList.filterByCategory(curCategory, ignoredSites);
            // View
            _this.render(data);
        });

        Backbone.on("addIgnoreSite", function (siteId) {
            // restore from config
            var ignoredSites = Config.addIgnoredSite(siteId);
            var curCategory = Config.getCurCategory();
            // Model
            data = newsList.filterByCategory(curCategory, ignoredSites);
            // View
            _this.render(data);            
        });
    },

    render: function (list) {

        var _this = this;
        var fragment = document.createDocumentFragment();
        this.$el.empty();
        
        _.each(list, function (info, index) {
            info.set("index", index); // 无法把index作为参数传入，Backbone.View只能识别model

            var newsView = new NewsView({
                model: info
            });
            
            fragment.appendChild(newsView.el);
        });

        _this.$el.append(fragment);
    },
    initNewsList: function (data) {
        newsList.reset(data, { silent: true });
    }

});

app.presenter = new app.Presenter;