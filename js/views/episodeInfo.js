var EpisodeInfo = Backbone.View.extend({
    template: _.template($('#episodeTemplate').html()),
    el: '#modalEpisode',
    render: function(id) {
        var self = this;
        this.model.fetch({
            success: function() {
                self.displayTemplate();
            }
        });
    },
    displayTemplate: function() {
        var template = this.template({
            wrapper : this.model.toJSON()
        });
        this.$el.html(template);
    }
});