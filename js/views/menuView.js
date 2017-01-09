var Menu = Backbone.View.extend({
    el: '#navbar-container',
    events: {
        'click #search': 'search',
        'keyup #query': 'processKey',
        'click #uMovie': 'home',
        'click #home-menu': 'home',
        'click #watchlists-menu': 'watchlists',
        'click #movie-menu': 'movie',
        'click #tvshow-menu': 'tvshow',
        'click #actor-menu': 'actor',
        'click #user-menu':'user'
    },
    initialize: function(){
        this.render();
        this.enableAutocomplete();
    },
    home: function() {
        Backbone.history.navigate('', { trigger: true })
    },
    watchlists: function() {
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

    user: function(){
        Backbone.history.navigate('#/user', {trigger:true})
    },

    search: function(){
        var query = $('#query').val();
        if(query !== ''){
            var results = GlobalSearch.search(query,20);
            $("#query").val("");
            results.done(function(results){
                var searchResult = new SearchResult({
                    collection: {
                        results: results.toJSON(),
                        userWatchList: watchListCollection
                    }
                });
                searchResult.render(query);
                router.navigate('/search?q=' + encodeURIComponent(query));
            });
        }
    },

    processKey: function(e) {
        if (e.which === 13) { // enter key
            this.search();
        }
    },

    render: function(){
        var template = _.template($('#menu-tpl').html());
        this.$el.html(template);
        return this;
    },

    enableAutocomplete: function() {
        $('#query').autocomplete({source: function(request, response) {
            $.when(
                MovieSearch.search(request.term, 5),
                TVShowSearch.search(request.term, 5)
            ).then(function(movies, tvshows, actors) {
                var findAutocomplete = new FindAutocomplete({
                    collection: {
                        movies: movies.models,
                        tvshows: tvshows.models
                    }
                });
                response(findAutocomplete.suggestionsList);
            });

        }});
    }
});

