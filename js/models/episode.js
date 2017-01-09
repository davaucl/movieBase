Episode = Backbone.Model.extend({
    url: function() {
        return baseURL + 'tvshows/seasons/' + this.id.idSerie + '/episodes';
    },
    initialize: function(id) {
        this.id = id;
    },
    parse: function(response) {
        for(var i = 0; i < response.resultCount; i++){
            if(this.id.idEpisode == response.results[i].trackId){
                console.log(response.results[i]);
                return response.results[i];
            }
        }
        return undefined;
    }
});