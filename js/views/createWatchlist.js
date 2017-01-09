var CreateWatchlist = Backbone.View.extend({
    template: _.template($('#createWatchlistTemplate').html()),
    el: '#page-wrapper',
    events: {
        'submit #create-watchlist-form': 'createWatchList'
    },

    render: function() {
        var template = this.template;
        this.$el.html(template);
    },

    createWatchList: function (ev) {
        var watchlistDetails = $(ev.currentTarget).serializeObject();
        var watchlist = new Watchlists();
        watchlist.save(watchlistDetails, {
            success: function () {
                router.navigate('watchlists', {trigger: true});
            }
        });
        return false;
    }
});