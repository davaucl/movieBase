/**
 * Created by marcus on 15/12/16.
 */

var FindAutocomplete = Backbone.View.extend({
    initialize: function() {
        this.suggestionsList = [];

        var moviesName = this.collection.movies.map(function(movie)
        {
            return {label: movie.get("trackName"), category: "Movies"};
        });
        var tvShowName = this.collection.tvshows.map(function(tvshow)
        {
            return {label: tvshow.get("collectionName"), category: "TVShows"};
        });
        this.suggestionsList = this.suggestionsList.concat(moviesName).concat(tvShowName);
    }
});

var FindAutocompleteActors = Backbone.View.extend({
    initialize: function() {
        this.suggestionsList = [];

        var actorsName = this.collection.actors.map(function(actor)
        {
            return {label: actor.get("artistName"), category: "Actors"};
        });
        this.suggestionsList = this.suggestionsList.concat(actorsName);
    }
});

var FindAutocompleteMovies = Backbone.View.extend({
    initialize: function() {
        this.suggestionsList = [];

        var moviesName = this.collection.movies.map(function(movie)
        {
            return {label: movie.get("trackName"), category: "Movies"};
        });
        this.suggestionsList = this.suggestionsList.concat(moviesName);
    }
});

var FindAutocompleteTVShows = Backbone.View.extend({
    initialize: function() {
        this.suggestionsList = [];

        var tvShowName = this.collection.tvshows.map(function(tvshow)
        {
            return {label: tvshow.get("collectionName"), category: "TVShows"};
        });
        this.suggestionsList = this.suggestionsList.concat(tvShowName);
    }
});