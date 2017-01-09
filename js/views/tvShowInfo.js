var TvShowInfo = Backbone.View.extend({
    template: _.template($('#serieTemplate').html()),
    el: '#page-wrapper',
    render: function(id) {
        var self = this;
        this.model.fetch({
            success: function() {
                self.displayTemplate();
            }
        });
    },
    displayTemplate: function() {
        var releasedDate = dateFormat(this.model.toJSON().releaseDate);

        var template = this.template({
            wrapper : this.model.toJSON(),
            release: releasedDate
        });
        this.$el.html(template);

        var tvShowEpisodes = new TvShowEpisodes({
            collection: this.collection
        });
        tvShowEpisodes.setElement(self.$('#main-informations-carousel-option2')).render();
        this.afterRender();
    },

    afterRender: function() {
        $('#navCarouselOption1').click();
    }
});