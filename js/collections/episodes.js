Episodes = Backbone.Collection.extend({
    url: function() {
        return baseURL + 'tvshows/seasons/' + this.id + '/episodes';
    },
    initialize: function(id) {
        this.id = id;
    },
    model: TvShow,
    parse: function(response) {
        return response;
    }
});