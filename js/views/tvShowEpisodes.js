var TvShowEpisodes = Backbone.View.extend({
    template: _.template($('#tvShowMainOption2Template').html()),
    el: '#page-wrapper',

    render: function() {
        var self = this;
        $.when(this.collection.episodes.fetch()).then(function() { self.displayTemplate();});
    },

    displayTemplate: function() {
        var template = this.template({
            episodes: this.collection.episodes.toJSON()[0]
        });
        this.$el.append(template);
    }
});

