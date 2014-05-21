var app = app || {};
var B = Backbone;

app.AppConfig = B.Model.extend({
    defaults: {
        currentCategory: "all",
        ignoredSites: [],
        keywords: []
    },
    initialize: function () {

    },
    // external API
    setCurCategory: function (category) {
        category = category || "all";
        this.set("currentCategory", category);
    },
    getCurCategory: function () {
        return this.get("currentCategory");
    },
    getIgnoredSites: function () {
        return this.get("ignoredSites");
    },
    addIgnoredSite: function (siteId) {
        var sites = this.get("ignoredSites");
        for (var i = 0; i < sites.length; i++) {
            if (sites[i] == siteId) {
                return;
            }
        }
        sites.push(siteId);
        this.set("ignoredSites", sites);
        return sites;
    },
    removeIgnoredSite: function (siteId) {
        var sites = this.get("ignoredSites");
        for (var i = 0; i < sites.length; i++) {
            if (sites[i] == siteId) {
                sites.splice(i, 1);
                break;
            }
        }
        this.set("ignoredSites", sites);
        return sites;
    }    
});

app.config = new app.AppConfig;