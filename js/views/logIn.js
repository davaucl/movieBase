/**
 * Created by Katia on 11/18/2016.
 */
var LogIn = Backbone.View.extend({
    template: _.template($('#loginTemplate').html()),
    el: '#page-wrapper',
    events: {
        'submit #logIn-user-form': 'logIn'
    },

    render: function() {
        var template = this.template;
        this.$el.html(template);
    }

});
