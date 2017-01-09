var ActorInfo = Backbone.View.extend({
    template: _.template($('#actorTemplate').html()),
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
        var template = this.template({
            wrapper : this.model.toJSON()
        });
        this.$el.html(template);

        var actorMovies = new ActorMovies({
            collection: this.collection
        });
        actorMovies.setElement(self.$('#main-informations-carousel-option2')).render();

        this.afterRender();
    },

    afterRender: function() {
        // populate the template with informations from other API's
        actorName_To_ActorData(this.model.attributes.artistName);
        $('#navCarouselOption1').click();
    }
});