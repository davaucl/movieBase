Movies = Backbone.Collection.extend({
    url: function() {
        return baseURL + 'actors/' + this.id + '/movies';
    },
    initialize: function(id) {
        this.id = id;
    },
    model: Actor,
    parse: function(response) {
        return response;
    }
});