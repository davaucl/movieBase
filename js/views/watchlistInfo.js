var WatchlistInfo = Backbone.View.extend({
    template: _.template($('#watchlistTemplate').html()),
    el: '#page-wrapper',
    events: {
        'click .watchlist-movie': 'goto'
    },
    goto: function(e) {
        Backbone.history.navigate("#movies/" + $(e.currentTarget).closest(".watchlist-movie").attr("data-id"),
            { trigger: true});
    },
    render: function() {
        var self = this;
        this.model.fetch({
            success: function() {
                self.displayTemplate();
            }
        });
        return this;
    },
    displayTemplate: function() {
        var template = this.template({
            wrapper : this.collection.watchlistCollection.toJSON()
        });
        this.$el.html(template);

        var watchlistMovies = new WatchlistMovies({
            collection: this.collection
        });
        watchlistMovies.setElement(self.$("#display-watchlist")).render();
    }
});
