/**
 * Created by marcus on 07/11/16.
 */

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.crossDomain = { crossDomain: true };
    if (options.url.indexOf("umovie") > -1 && session.get("access_token") !== "") {
        if (options.url.includes("?")) {
            options.url = options.url + '&access_token='+ session.get("access_token");
        } else {
            options.url = options.url + '?access_token='+ session.get("access_token");
        }
    }
});

// create a user session
var session = new Session()

var userPage = new UserPage();

var notFoundError = new NotFoundError();

var watchListCollection = new WatchlistCollection();
// Views
var tvshowInfo = new TvShowInfo({
    model: new TvShow(),
    collection: {
        episodes: []
    }
});

var movieInfo = new MovieInfo({
    model: new Movie(),
    collection: {
        userWatchList: watchListCollection
    }
});

var episodeInfo = new EpisodeInfo({
    model: new Episode()
});

var actorInfo = new ActorInfo({
    model: new Actor(),
    collection: {
        movies: []
    }
});

var watchlistsInfo = new WatchlistsInfo({
    model: new Watchlists(),
    collection: {
        watchlist: []
    }
});

var watchlistInfo = new WatchlistInfo({
    model: new Watchlist(),
    collection: {
        movies: []
    }
});

var createWatchlist = new CreateWatchlist();

var searchResult = new SearchResult({
    collection: {
        userWatchList: watchListCollection
    }
});
var connection = new Connection({ type: "Login"});
$('#page-background-container').prepend('<img src="content/images/DarthVader1080p.jpg" alt="background-image:dark vador" />');
var menu = new Menu();
var footer = new Footer();
