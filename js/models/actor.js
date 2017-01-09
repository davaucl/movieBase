Actor = Backbone.Model.extend({
    urlRoot: baseURL + 'actors',
    parse: function(response) {
        if (response.resultCount === 1) {
            return response.results[0];
        } else {
            return response.results;
        }
    }
});