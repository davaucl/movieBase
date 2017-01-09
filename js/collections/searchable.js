/**
 * Created by marcus on 22/11/16.
 */

var Searchable = Backbone.Collection.extend({},{
    search: function(query, limit, options){
        var search = $.Deferred();
        options = options || {};
        var collection = new this([], options);
        collection.url = _.result(collection, 'url');
        var fetch = collection.fetch({
            data: {
                q: query,
                limit: limit
            },
            error: function(model, response) {
                if (response.status === 401) {
                    console.log('Response status 401 from Searchable Collection')
                }
            }
        });
        fetch.done(_.bind(function(){
            Backbone.Events.trigger('search:done');
            search.resolveWith(this, [collection]);
        }, this));
        fetch.fail(function(){
            Backbone.Events.trigger('search:fail');
            search.reject();
        });
        return search.promise();
    }
});

var GlobalSearch = Searchable.extend({
    url: baseURL + 'search',
    parse: function(response) {
        return response.results
    }
});

var MovieSearch = Searchable.extend({
    url: baseURL + 'search/movies',
    parse: function(response) {
        return response.results
    }
});

var TVShowSearch = Searchable.extend({
    url: baseURL + 'search/tvshows/seasons',
    parse: function(response) {
        return response.results
    }
});

var ActorSearch = Searchable.extend({
    url: baseURL + 'search/actors',
    parse: function(response) {
        return response.results
    }
});

