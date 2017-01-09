Movie = Backbone.Model.extend({
    urlRoot: baseURL + 'movies',
    parse: function(response) {
        if (response.resultCount === 1) {
            return response.results[0];
        } else {
            return response.results;
        }
    }
});