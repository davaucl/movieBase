Watchlist = Backbone.Model.extend({
    urlRoot: baseURL + 'watchlists',
    parse: function(response) {
        return response;
    },

    add: function(watchable){
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: this.url() + "/movies",
            data: watchable.toJSON()
        }).done(function(){
            console.log("Added with success");
        }).fail(function(xhr){
            console.log("Failed to add");
        })
    }
});
