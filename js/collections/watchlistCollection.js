WatchlistCollection = Backbone.Collection.extend({
    url: function() { return baseURL + 'watchlists'; },
    model: Watchlist,
    initialize: function(id) {
        var identifiant = id ? id.watchlistOwner : session.get("userId");
        this.watchlistOwner =  identifiant;
    },

    parse: function(response) {
        var self = this;
        return _.filter(response, function (watchlist) {
            if (typeof watchlist.owner !== 'undefined') {
                return watchlist.owner.id === self.watchlistOwner;
            } else {
                return false;
            }
        });
    }
});


