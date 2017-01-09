var SignUp = Backbone.View.extend({
    template: _.template($('#signUpTemplate').html()),
    el: '#page-wrapper',
    events: {
        'submit #signUp-form': 'signUp'
    },

    render: function() {
        var template = this.template;
        this.$el.html(template);
    }

    // Add create User once the User page is created (follow create watchList exemple)
});