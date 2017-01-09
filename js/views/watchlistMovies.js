var WatchlistMovies = Backbone.View.extend({
    template: _.template($('#movies-watchlist-container').html()),
    el: '#page-wrapper',
    render: function() {
        var self = this;
        $.when(this.collection.watchlistCollection.fetch()).then(function() {
            self.displayTemplate();
        });
    },
    displayTemplate: function() {
        var template = this.template({
            wrapper: this.collection.watchlistCollection.toJSON()[0]
        });
        this.$el.append(template);
    }
});
