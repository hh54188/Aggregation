var News = Backbone.Model.extend({
    defaults: {
        title: "",
        url: "",
        hash: "",
        date: "",
        meta: {
            website: "",
            aka: "",
            updateInterval: "",
            category_id: "",
            category_name: ""
        }
    },
    initialize: function () {
        
    }
});