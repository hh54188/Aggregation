var app = app || {};
var B = Backbone;

app.AppConfig = B.Model.extend({
    defaults: {
        currentCategory: "all",
        sites: {
            ignored: []
        },
        keywords: {
            max: 10,
            words: []
        }
    },
    initialize: function () {

    },
    // external API
    setCurCategory: function (category) {
        category = category || "all";
        this.set("currentCategory", category);
    }
});

app.config = new app.AppConfig;