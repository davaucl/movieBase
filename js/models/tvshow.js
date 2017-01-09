TvShow = Backbone.Model.extend({
    urlRoot: baseURL + 'tvshows/seasons',
    parse: function(response) {
        if (response.resultCount === 1) {
            return response.results[0];
        } else {
            return response.results;
        }
    }
});

