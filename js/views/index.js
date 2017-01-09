var Home = Backbone.View.extend({
    el: '#page-wrapper',
    events: {
        'click #random-movie': 'movie',
        'click #random-tvshow': 'tvshow',
        'click #random-actor': 'actor',
        'click #random-watchlist': 'watchlist'
    },
    watchlist: function() {
        Backbone.history.navigate('#/watchlists', { trigger: true })
    },
    movie: function() {
        Backbone.history.navigate('#/movies/514526304', { trigger: true });
    },
    tvshow: function() {
        Backbone.history.navigate('#/tvshows/seasons/271383858', { trigger: true })
    },
    actor: function() {
        Backbone.history.navigate('#/actors/299473741', { trigger: true })
    },
    render: function() {
        $('#page-background-container').prepend('<img src="content/images/DarthVader1080p.jpg" alt="background-image:dark vador" />');
        var template = _.template($('#indexTemplate').html());
        this.$el.html(template);
        return this;
    }
});
