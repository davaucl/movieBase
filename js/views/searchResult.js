/**
 * Created by marcus on 22/11/16.
 */

var SearchResult = Backbone.View.extend({
    template: _.template($('#searchResultTemplate').html()),
    el: '#page-wrapper',
    events: {
        'click .filterOption': 'filterByGenre',
        'click .searchOption': 'setSearchScope',
        'keyup #specificQueryInput': 'processKey',
    },

    render: function(query) {
        var self = this;
        if(this.collection.userWatchList != undefined) {
            this.collection.userWatchList.fetch({
                success: function () {
                    var moviesResults = _.filter(self.collection.results, function (result) {
                        return result.wrapperType === "track";
                    });
                    var tvshowsResults = _.filter(self.collection.results, function (result) {
                        return result.wrapperType === "collection";
                    });
                    var artistsResults = _.filter(self.collection.results, function (result) {
                        return result.wrapperType === "artist";
                    });
                    self.displayTemplate(moviesResults, tvshowsResults, artistsResults, query);
                }
            });
        }
    },

    renderFiltered: function(filteredCollection) {
        var moviesResults = _.filter(filteredCollection, function(result){ return result.wrapperType === "track";});
        var tvshowsResults = _.filter(filteredCollection, function(result){ return result.wrapperType === "collection";});
        this.displayTemplate(moviesResults, tvshowsResults, query);
    },

    processKey: function(e) {
        if (e.which === 13) { // enter key
            this.search();
        }
    },

    displayTemplate: function(moviesResults, tvshowsResults, artistsResults, query) {
        var template = this.template({
            userWatchlists : this.collection.userWatchList.toJSON(),
            moviesResults: moviesResults,
            tvshowsResults: tvshowsResults,
            artistsResults: artistsResults,
            query: query
        });
        this.$el.html(template);
    },

    filterByGenre: function(e) {
        e.preventDefault();
        var genre = $(e.currentTarget).attr("id");
        if (genre === 'showAll') {
            this.render();
        } else {
            var filteredCollection = _.filter(this.collection, function(result){ return result.primaryGenreName === genre;});
            this.renderFiltered(filteredCollection);
        }
    },

    search: function(){
        var query = $('#specificQueryInput').val();
        if(query !== ''){
            if ($('#searchChoice').html().includes("Movie")) {
                var results = MovieSearch.search(query,20);
            } else if ($('#searchChoice').html().includes("TVShow")) {
                var results = TVShowSearch.search(query,20);
            } else if ($('#searchChoice').html().includes("Actor")) {
                var results = ActorSearch.search(query,20);
            } else {
                var results = GlobalSearch.search(query,20);
            }
            $("#specificQueryInput").val("");
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

    setSearchScope: function(e) {
        e.preventDefault();
        var currentChoice = $(e.currentTarget).attr("id");
        $('#searchChoice').html('Search in ' + currentChoice.substring(8) + '<span class="caret"></span>');

        // enable autocomplete to a specific search category
        $('#specificQueryInput').autocomplete({source: function(request, response) {
            if (currentChoice === "searchInActors") {
                $.when(
                    ActorSearch.search(request.term, 5)
                ).then(function(actors) {
                    var findAutocompleteActors = new FindAutocompleteActors({
                        collection: {
                            actors: actors.models
                        }
                    });
                    response(findAutocompleteActors.suggestionsList);
                });
            } else if (currentChoice === "searchInMovies") {
                $.when(
                    MovieSearch.search(request.term, 5)
                ).then(function(movies) {
                    var findAutocompleteMovies = new FindAutocompleteMovies({
                        collection: {
                            movies: movies.models
                        }
                    });
                    response(findAutocompleteMovies.suggestionsList);
                });
            } else if (currentChoice === "searchInTVShows") {
                $.when(
                    TVShowSearch.search(request.term, 5)
                ).then(function(tvshows) {
                    var findAutocompleteTVShows = new FindAutocompleteTVShows({
                        collection: {
                            tvshows: tvshows.models
                        }
                    });
                    response(findAutocompleteTVShows.suggestionsList);
                });
            } else if (currentChoice === "searchInGlobal") {
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
            }

        }});
    },

});

