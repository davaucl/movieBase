var ActorMovies = Backbone.View.extend({
    template: _.template($('#actorMainOption2Template').html()),
    el: '#page-wrapper',

    render: function() {
        var self = this;
        $.when(this.collection.movies.fetch()).then(function() { self.displayTemplate();});
    },

    displayTemplate: function() {
        var template = this.template({
            movies: this.collection.movies.toJSON()[0]
        });
        this.$el.append(template);
    }
});

