var WatchlistsInfo = Backbone.View.extend({
    template: _.template($('#watchlistsTemplate').html()),
    el: '#page-wrapper',
    render: function() {
        var self = this;
        this.model.fetch({
            success: function() {
                self.displayTemplate();
            }
        });
        return this;
    },
    displayTemplate: function() {
        var template = this.template({
            wrapper : this.model.toJSON()
        });
        this.$el.html(template);
    }
});
