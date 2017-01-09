/**
 * Created by marcus on 11/11/16.
 */

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'tvshows/seasons/:id': 'tvshow',
        'movies/:id': 'movie',
        'actors/:id': 'actor',
        'watchlists': 'watchlists',
        'createWatchlist': 'createWatchlist',
        'editWatchlist/:id': 'editWatchlist',
        'watchlist/:id': 'watchlist',
        'search?q=:query': 'globalSearch',
        'signup': 'signup',
        'login':'login',
        'logoff':'logoff',
        'user/:id': 'user',
        'user': 'user',
        'tvshows/seasons/:idSerie/episodes/:idEpisode': 'episode',
        '*error': 'error'
    }
});

var router = new Router;

router.on('route:index', function() {
    menu.$el.hide();
    if (session.get("signedIn").toLowerCase() === "true") {
        var home = new Home();
        home.render();
        menu.$el.show();
    } else {
        router.navigate('#/login');
    }
});

router.on('route:tvshow', function(id) {
    var tvshow = new TvShow({id: id});
    var episodes = new Episodes(id);
    tvshowInfo.model = tvshow;
    tvshowInfo.collection.episodes = episodes;
    tvshowInfo.render();
});

router.on('route:movie', function(id) {
    var movie = new Movie({id: id});
    movieInfo.model = movie;
    movieInfo.render();
});

router.on('route:episode', function(idSerie, idEpisode) {
    var episode = new Episode({idSerie: idSerie, idEpisode: idEpisode});
    episodeInfo.model = episode;
    episodeInfo.render();
});

router.on('route:actor', function(id) {
    var actor = new Actor({id: id});
    var movies = new Movies(id);
    actorInfo.model = actor;
    actorInfo.collection.movies = movies;
    actorInfo.render();
});

router.on('route:watchlists', function() {
    var watchlists = new Watchlists();
    watchlistsInfo.collection.watchlist = watchlists;
    watchlistsInfo.render();
});

router.on('route:createWatchlist', function() {
    createWatchlist.render();
});

router.on('route:editWatchlist', function(id) {
    var editWatchlist = new EditWatchlist({id: id});
    editWatchlist.render();
});

router.on('route:watchlist', function(id) {
    var watchlist = new Watchlist(id);
    var watchlistCollection = new WatchlistCollection(id);
    watchlistInfo.model = watchlist;
    watchlistInfo.collection.watchlistCollection = watchlistCollection;
    watchlistInfo.render();
});

router.on('route:signup', function(){
    if (session.get("signedIn").toLowerCase() === "false") {
        connection.actionType = "SignUp";
        connection.render();
    } else {
        router.navigate('#/');
    }

});
router.on('route:login', function() {
    if (session.get("signedIn").toLowerCase() === "false") {
        connection.actionType = "Login";
        connection.render();
    } else {
        router.navigate('#/');
    }
});

router.on('route:globalSearch', function(query){
    results = GlobalSearch.search(query, 20);
    results.done(function (results) {
        searchResult.collection = results.toJSON();
        searchResult.render(query);
    });
});

router.on('route:user', function(id) {
    if (session.get("signedIn").toLowerCase() === "true") {
        var userId = id ? id : session.get("userId");
        var user = new User({id: userId});
        userPage.model = user;
        userPage.render();
    } else {
        router.navigate('#/login');
    }
});

router.on('route:error', function() {
    router.navigate('#/login');
});


Backbone.history.start();
